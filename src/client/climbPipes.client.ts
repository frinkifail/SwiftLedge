import states from "shared/states";
import { ContextActionService, ProximityPromptService, UserInputService, Workspace } from '@rbxts/services';

ProximityPromptService.PromptTriggered.Connect((prompt, plr) => {
    if (prompt.ObjectText !== "Pipe") return;
    if (states.climbing || states.sliding) return;
    function getBottom() {
        return pos0.Position.Y - (pos0.Size.Y * 2)
    }
    states.climbing = true
    const hum = plr.Character!.Humanoid;
    const runspeed = hum.WalkSpeed;
    hum.WalkSpeed = 0;
    const grav = Workspace.Gravity
    Workspace.Gravity = 0;
    const pos0 = <Part>prompt.Parent!;
    const pos1 = plr.Character!.PrimaryPart!
    const pos2 = new Vector3(pos0.Position.X, // if player position is more than the position of pipe's y (on top) or
    // player position is less than the bottom of the pipe
    // if the above condition is true, use the pipe's position (player is not in pipe range)
    // if its false (player IS in pipe range), use player position
        (
            pos1.Position.Y
            > pos0.Position.Y
        )
        || pos1.Position.Y < getBottom() ? pos0.Position.Y : pos1.Position.Y, pos0.Position.Z).sub(
            Workspace.CurrentCamera!.CFrame.LookVector.mul(2)
            );
    pos1.AssemblyLinearVelocity = Vector3.zero
	pos1.AssemblyAngularVelocity = Vector3.zero
    const visualizer = new Instance('Part');
    visualizer.Position = pos2;
    visualizer.Parent = Workspace;
    visualizer.Anchored = true;
    visualizer.Size = Vector3.one;
    visualizer.CanCollide = false;
    pos0.CanCollide = false;
    plr.Character!.MoveTo(pos2);
    ContextActionService.BindAction('get off pipe', (name) => {
        states.climbing = false;
        hum.WalkSpeed = runspeed;
        Workspace.Gravity = grav;
        ContextActionService.UnbindAction(name);
    }, true, Enum.KeyCode.Space)
    while (states.climbing) {
        if (UserInputService.IsKeyDown("W")) {
            const vec = pos1.Position.add(new Vector3(0, 1));
            if (vec.Y > pos0.Position.Y) {
                return;
            }
            plr.Character!.MoveTo(vec);
        } else if (UserInputService.IsKeyDown("S")) {
            const vec = pos1.Position.add(new Vector3(0, -1));
            if (pos1.Position.Y < getBottom()) {
                return;
            }
            plr.Character!.MoveTo(vec);
        }
        wait(0.0165)
    }
})
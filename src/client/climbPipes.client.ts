import states from "shared/states";
import { ProximityPromptService } from '@rbxts/services';

ProximityPromptService.PromptTriggered.Connect((prompt, plr) => {
    if (prompt.ObjectText !== "Pipe") return;
    if (states.climbing || states.sliding) return;
    states.climbing = true
    const hum = plr.Character!.Humanoid;
    const runspeed = hum.WalkSpeed;
    hum.WalkSpeed = 0;
    const uis = game.GetService("UserInputService")
    const grav = game.Workspace.Gravity
    game.Workspace.Gravity = 0;
    const pos0 = (<Part>prompt.Parent!).Position;
    const pos1 = new Vector3(pos0.X, pos0.Y - (<Part>prompt.Parent!).Size.Y, pos0.Z).sub(game.Workspace.CurrentCamera!.CFrame.LookVector);
    plr.Character!.PrimaryPart!.AssemblyLinearVelocity = Vector3.zero
	plr.Character!.PrimaryPart!.AssemblyAngularVelocity = Vector3.zero
    plr.Character!.MoveTo(pos1);
    while (states.climbing) {
        if (uis.IsKeyDown("W")) {
            hum.Move(new Vector3(0, 5));
        } else if (uis.IsKeyDown("S")) {
            hum.Move(new Vector3(0, -5));
        } else if (uis.IsKeyDown("Space")) {
            states.climbing = false;
            hum.WalkSpeed = runspeed;
            game.Workspace.Gravity = grav;
            break;
        }
        wait(0.05)
    }
    // const cas = game.GetService("ContextActionService")
    // cas.BindAction('climb up', () => {
    //     hum.Move(new Vector3(0, 10))
    // }, true, Enum.KeyCode.W)
})
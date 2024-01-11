import states from "shared/states";
import { ProximityPromptService, UserInputService, Workspace } from '@rbxts/services';

ProximityPromptService.PromptTriggered.Connect((prompt, plr) => {
    if (prompt.ObjectText !== "Pipe") return;
    if (states.climbing || states.sliding) return;
    states.climbing = true
    const hum = plr.Character!.Humanoid;
    const runspeed = hum.WalkSpeed;
    hum.WalkSpeed = 0;
    const grav = Workspace.Gravity
    Workspace.Gravity = 0;
    const pos0 = (<Part>prompt.Parent!).Position;
    const pos1 = new Vector3(pos0.X, pos0.Y - (<Part>prompt.Parent!).Size.Y, pos0.Z).sub(Workspace.CurrentCamera!.CFrame.LookVector);
    plr.Character!.PrimaryPart!.AssemblyLinearVelocity = Vector3.zero
	plr.Character!.PrimaryPart!.AssemblyAngularVelocity = Vector3.zero
    plr.Character!.MoveTo(pos1);
    while (states.climbing) {
        if (UserInputService.IsKeyDown("W")) {
            hum.Move(new Vector3(0, 5));
        } else if (UserInputService.IsKeyDown("S")) {
            hum.Move(new Vector3(0, -5));
        } else if (UserInputService.IsKeyDown("Space")) {
            states.climbing = false;
            hum.WalkSpeed = runspeed;
            Workspace.Gravity = grav;
            break;
        }
        wait(0.05)
    }
})
///<reference path="../types.d.ts" />
import { RunService, UserInputService } from '@rbxts/services';
import updateRun from './running';
import slide from './sliding';
import wallclimb from './wallclimb';

const plr = game.GetService('Players').GetPlayerFromCharacter(script.Parent!.Parent)!;
const hum = plr.Character!.Humanoid;
const cam = game.Workspace.CurrentCamera!;
const hrp = <Part>script.Parent!.Parent!.FindFirstChild('HumanoidRootPart')!; // too lazy to change this

plr.CameraMode = Enum.CameraMode.LockFirstPerson;

RunService.Heartbeat.Connect((dt) => {
    updateRun(plr, hum, cam, dt);
})

UserInputService.InputBegan.Connect((input, gpe) => {
    if (gpe) return;
    switch (input.KeyCode) {
        case Enum.KeyCode.Space:
            wallclimb(cam, hrp);
            break;
        case Enum.KeyCode.LeftShift:
            slide(hrp, hum, cam);
            break;
    }
})


import updateRun from './running';
import slide from './sliding';
import wallclimb from './wallclimb';
const plr = game.GetService('Players').GetPlayerFromCharacter(script.Parent!.Parent)!;
const hum = <Humanoid>script.Parent!.Parent!.FindFirstChild('Humanoid')!;
const cam = game.Workspace.CurrentCamera!;
const hrp = <Part>script.Parent!.Parent!.FindFirstChild('HumanoidRootPart')!;
// const scs = game.GetService("StarterPlayer").FindFirstChild('StarterCharacterScripts')!
// interface Modules {
//     wallclimb: ModuleCallback
// }
// const modules = <Modules>{
//     wallclimb: require(<ModuleScript>scs.FindFirstChild('TS')!.FindFirstChild('wallclimb')!)
// }

plr.CameraMode = Enum.CameraMode.LockFirstPerson;

game.GetService("RunService").Heartbeat.Connect((dt) => {
    updateRun(<ExtendedPlayer>plr, hum, cam, dt);
})

game.GetService("UserInputService").InputBegan.Connect((input, gpe) => {
    if (gpe) return;
    switch (input.KeyCode) {
        case Enum.KeyCode.Space:
            wallclimb(cam, hrp);
            break;
        case Enum.KeyCode.LeftShift:
            slide(hrp, hum);
            break;
    }
})


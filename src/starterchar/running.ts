///<reference path="../types.d.ts" />
import config from "shared/config";
import states from "shared/states";

export default function updateRun(plr: ExtendedPlayer, hum: Humanoid, cam: Camera, dt: number) {
    const runmeter = <Frame>plr.PlayerGui.FindFirstChild('HUD')?.FindFirstChild('RunMeter');
    const progress = <TextLabel>runmeter.FindFirstChild("Progress");
    const runicon = <ImageLabel>runmeter.Parent!.FindFirstChild("RunIcon")
    if (states.climbing || states.sliding) return;
    progress.TweenSize(
        UDim2.fromScale(
            (hum.WalkSpeed - config.minws) 
            / (config.maxws - config.minws), 
            1
        ),
        Enum.EasingDirection.InOut,
        Enum.EasingStyle.Quad,
        dt,
        true
    );
    const wscale = progress.Size.Width.Scale;
    if (wscale <= 0 || wscale >= 1) {
        runmeter.Visible = false;
        if (wscale >= 1) runicon.Image = 'http://www.roblox.com/asset/?id=6026568215';
    }
    else {
        runmeter.Visible = true;
        runicon.Image = 'http://www.roblox.com/asset/?id=6026568199';
    }
    if (hum.MoveDirection === Vector3.zero) {
        if (hum.WalkSpeed > config.minws) {
			hum.WalkSpeed -= config.dfactor * dt
        }
		if (cam.FieldOfView > config.minFov) {
			cam.FieldOfView -= config.camDFactor
        }
    } else {
        if (hum.WalkSpeed < config.maxws) {
			hum.WalkSpeed += dt * config.afactor
        }
		if (cam.FieldOfView < config.maxFov) {
			cam.FieldOfView += config.camAFactor
        }
    }
}
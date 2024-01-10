import config from "shared/config";
import states from "shared/states";
export default function slide(hrp: Part, hum: Humanoid, cam: Camera) {
    const runspeed = hum.WalkSpeed;
    if (states.sliding || states.climbing) return;
    const attachment = new Instance("Attachment", hrp);
    const force = new Instance("VectorForce");
    force.Attachment0 = attachment;
    force.Force = new Vector3(cam.CFrame.X, 0, cam.CFrame.Y).mul(config.slideMultiplier);
    force.Parent = hrp;
    states.sliding = true;
    hum.WalkSpeed = 0;
    wait(config.slideDuration);
    hum.WalkSpeed = runspeed;
    force.Destroy();
    attachment.Destroy();
    states.sliding = false;
}
import config from "shared/config";
import states from "shared/states";
export default function slide(hrp: Part, hum: Humanoid) {
    const runspeed = hum.WalkSpeed;
    if (states.sliding) return;
    const attachment = new Instance("Attachment", hrp);
    const force = new Instance("VectorForce");
    force.Attachment0 = attachment;
    force.Parent = hrp;
    states.sliding = true;
    hum.WalkSpeed = 0;
    wait(config.slideDuration);
    hum.WalkSpeed = runspeed;
    force.Destroy();
    attachment.Destroy();
    states.sliding = false;
}
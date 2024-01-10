import states from "shared/states";

export default function wallclimb(cam: Camera, hrp: Part) {
    if (states.sliding || states.climbing) return;
    const lookvector = cam.CFrame.LookVector
    const raycast = game.Workspace.Raycast(cam.CFrame.Position.add(lookvector), lookvector)!
    const inst = raycast.Instance
    const notAllowed = new Set([
        "Handle",
        "Head",
        hrp.Name,
        "UpperTorso",
        "LowerTorso"
    ])
    if (inst.Size.X > inst.Size.Y || notAllowed.has(inst.Name)) return;
    hrp.AssemblyLinearVelocity = new Vector3(0, 100);
}
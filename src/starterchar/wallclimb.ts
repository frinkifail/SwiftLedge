import { Workspace } from "@rbxts/services";
import states from "shared/states";

export default function wallclimb(cam: Camera, hrp: Part) {
    if (states.sliding || states.climbing || states.wallclimbCount > 0) return;
    states.wallclimbCount += 1
    const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Exclude
	raycastParams.FilterDescendantsInstances = [hrp.Parent!];
	raycastParams.IgnoreWater = true

	const viewportCenter = new Vector2(cam.ViewportSize.X/2, cam.ViewportSize.Y/2)
	const viewportRay = cam.ViewportPointToRay(viewportCenter.X, viewportCenter.Y)
	const raycast = Workspace.Raycast(viewportRay.Origin, viewportRay.Direction.mul(1000), raycastParams)
    if (!raycast) return;
    const inst = raycast.Instance
    const notAllowed = new Set([
        "Handle",
        "Head",
        hrp.Name,
        "UpperTorso",
        "LowerTorso"
    ])
    if (inst.Size.X > inst.Size.Y || notAllowed.has(inst.Name) || raycast.Distance > 3.5) return;
    hrp.AssemblyLinearVelocity = new Vector3(0, 100);
}
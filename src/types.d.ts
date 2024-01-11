type _PlayerHUD = ScreenGui & {
    RunMeter: Frame & {
        Progress: TextLabel;
        Parent: _PlayerHUD;
    };
    RunIcon: ImageLabel;
}
interface Player {
    PlayerGui: Folder & {
        HUD: _PlayerHUD;
    };
    Character: Model & {
        Humanoid: Humanoid
    } | undefined
}
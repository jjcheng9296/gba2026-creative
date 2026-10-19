import { Composition } from "remotion";
import { Banner, T } from "./Banner";
import { Banner9, T9, T9B } from "./Banner9";
import { Banner10, T10 } from "./Banner10";
import { Banner11, T11 } from "./Banner11";
import { Banner11v2, T11V2 } from "./Banner11v2";
import { Banner11v3, T11V3 } from "./Banner11v3";
import { Banner11v4, T11V4 } from "./Banner11v4";
import { Banner11v5, T11V5 } from "./Banner11v5";
import { BannerVar1, TVAR1 } from "./BannerVar1";
import { BannerVar2, TVAR2 } from "./BannerVar2";

const FPS = 12;
const FRAMES = Math.ceil(T.end * FPS);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="LB" component={Banner} defaultProps={{ size: "lb" as const }} width={1456} height={180} fps={FPS} durationInFrames={FRAMES} />
    <Composition id="MR" component={Banner} defaultProps={{ size: "mr" as const }} width={680} height={560} fps={FPS} durationInFrames={FRAMES} />
    <Composition id="LB8" component={Banner} defaultProps={{ size: "lb" as const, mode: "bang" as const }} width={1456} height={180} fps={FPS} durationInFrames={FRAMES} />
    <Composition id="MR8" component={Banner} defaultProps={{ size: "mr" as const, mode: "bang" as const }} width={680} height={560} fps={FPS} durationInFrames={FRAMES} />
    <Composition id="LB9" component={Banner9} defaultProps={{ size: "lb" as const }} width={1456} height={180} fps={FPS} durationInFrames={Math.ceil(T9.end * FPS)} />
    <Composition id="MR9" component={Banner9} defaultProps={{ size: "mr" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T9.end * FPS)} />
    <Composition id="MR9B" component={Banner9} defaultProps={{ size: "mr" as const, rev: "b" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T9B.end * FPS)} />
    <Composition id="LB10" component={Banner10} width={1456} height={180} fps={FPS} durationInFrames={Math.ceil(T10.end * FPS)} />
    <Composition id="MR11A" component={Banner11} defaultProps={{ set: "a" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11.end * FPS)} />
    <Composition id="MR11B" component={Banner11} defaultProps={{ set: "b" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11.end * FPS)} />
    <Composition id="MR11A2" component={Banner11v2} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V2.end * FPS)} />
    <Composition id="MR11A3" component={Banner11v3} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V3.end * FPS)} />
    <Composition id="MR11A4" component={Banner11v4} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V4.end * FPS)} />
    <Composition id="MR11A4HD" component={Banner11v4} defaultProps={{ hi: true }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V4.end * FPS)} />
    <Composition id="MR11A5" component={Banner11v5} defaultProps={{ hi: false, whenV: "a" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V5.end * FPS)} />
    <Composition id="MR11A5HD" component={Banner11v5} defaultProps={{ hi: true, whenV: "a" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V5.end * FPS)} />
    <Composition id="MR11A5B" component={Banner11v5} defaultProps={{ hi: false, whenV: "b" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V5.end * FPS)} />
    <Composition id="MR11A5BHD" component={Banner11v5} defaultProps={{ hi: true, whenV: "b" as const }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(T11V5.end * FPS)} />
    <Composition id="MR11VAR1" component={BannerVar1} defaultProps={{ hi: false }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(TVAR1.end * FPS)} />
    <Composition id="MR11VAR1HD" component={BannerVar1} defaultProps={{ hi: true }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(TVAR1.end * FPS)} />
    <Composition id="MR11VAR2" component={BannerVar2} defaultProps={{ hi: false }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(TVAR2.end * FPS)} />
    <Composition id="MR11VAR2HD" component={BannerVar2} defaultProps={{ hi: true }} width={680} height={560} fps={FPS} durationInFrames={Math.ceil(TVAR2.end * FPS)} />
  </>
);

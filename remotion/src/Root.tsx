import { Composition } from "remotion";
import { Banner, T } from "./Banner";
import { Banner9, T9, T9B } from "./Banner9";
import { Banner10, T10 } from "./Banner10";

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
  </>
);

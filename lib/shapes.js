// Triforce geometry (units ≈ px, y grows downward). Shared by the 2D logo and the 3D scene.
const shrink = (pts, k) => {
  const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  return pts.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]);
};

const H = 34.6; // height of each small triangle (side 40)
export const TOP = -70, MID = TOP + H, BOT = TOP + 2 * H;

export const crest = {
  tri: [
    shrink([[0, TOP], [-20, MID], [20, MID]], 0.97),
    shrink([[-20, MID], [-40, BOT], [0, BOT]], 0.97),
    shrink([[20, MID], [0, BOT], [40, BOT]], 0.97),
  ],
};
export const allPolys = crest.tri;
export const toPath = (pts) => "M" + pts.map((p) => p.map((v) => v.toFixed(2)).join(" ")).join("L") + "Z";

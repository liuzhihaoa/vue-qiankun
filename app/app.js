const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");

const app = new Koa();
const fse = require("fs-extra");
const multer = require("@koa/multer");
const path = require("path");
// 开启跨域
const cors = require("@koa/cors");

app.use(cors());
const router = new Router({
  prefix: "/api",
});
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method === "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
const UPLOAD_DIR = path.join(__dirname, "uploads");

const getFilename = (req) => {
  const { hash } = req.body;
  const chunkDir = path.join(UPLOAD_DIR, hash);

  if (!fse.existsSync(chunkDir)) {
    fse.mkdirSync(chunkDir);
  }
  return chunkDir;
};

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, getFilename(req));
  },
  filename(req, file, callback) {
    const request = req;
    callback(null, request.body.chunkIndex);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/upload",
  upload.fields([
    {
      name: "file",
      maxCount: 100,
    },
  ]),
  (ctx) => {
    if (ctx.files) {
      ctx.body = "上传文件成功";
    } else {
      ctx.status = 400;
      ctx.body = "上传文件失败";
    }
  }
);

router.post("/merge", async (ctx) => {
  const { filename, hash } = ctx.request.body;
  const ext = filename.split(".")[1];
  const chunkDir = path.join(UPLOAD_DIR, hash);
  const chunks = await fse.readdir(chunkDir);

  chunks
    .sort((a, b) => Number(a) - Number(b))
    .forEach((chunkPath) => {
      // 合并文件
      fse.appendFileSync(path.join(UPLOAD_DIR, `${hash}.${ext}`), fse.readFileSync(`${chunkDir}/${chunkPath}`));
    });
  // 删除临时文件夹
  fse.removeSync(chunkDir);
  // 返回文件地址
  ctx.body = "合并成功";
});

router.post("/verify", async (ctx) => {
  const { filename, hash } = ctx.request.body;
  const ext = filename.split(".")[1];
  const chunkDir = path.join(UPLOAD_DIR, hash);

  if (fse.existsSync(path.join(UPLOAD_DIR, `${hash}.${ext}`))) {
    ctx.body = true;
  } else if (fse.existsSync(path.join(UPLOAD_DIR, `${hash}`))) {
    const chunks = await fse.readdir(chunkDir);
    const res = [];
    chunks.forEach((name) => {
      const index = Number(name);
      const chunk = fse.readFileSync(`${chunkDir}/${name}`);
      res[index] = chunk.length;
    });
    ctx.body = res;
    console.log(res);
  } else {
    ctx.body = false;
  }
});

app.use(bodyParser());
app.use(router.routes());
app.listen(4000, () => {
  console.log("服务启动成功，running http://127.0.0.1:4000");
});

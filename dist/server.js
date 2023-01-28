"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));
var import_express12 = __toESM(require("express"));

// src/shared/errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};
__name(AppError, "AppError");

// src/routes/index.ts
var import_express11 = require("express");

// src/routes/authenticate.routes.ts
var import_express = require("express");

// src/modules/account/useCases/auth/AuthenticateClientUseCase.ts
var import_bcrypt = require("bcrypt");
var import_jsonwebtoken = require("jsonwebtoken");

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/cache/index.ts
var import_ioredis = __toESM(require("ioredis"));
var redis = new import_ioredis.default({
  host: `${process.env.REDIS_HOST}`,
  port: Number(process.env.REDIS_PORT),
  password: `${process.env.REDIS_PASSWORD}`
});

// src/modules/account/useCases/auth/AuthenticateClientUseCase.ts
var AuthenticateClientUseCase = class {
  async execute({ email, password }) {
    const client = await prisma.client.findFirst({
      where: {
        email
      }
    });
    if (!client) {
      throw new AppError("E-mail inv\xE1lido");
    }
    await redis.flushdb();
    const passwordMatch = await (0, import_bcrypt.compare)(password, client.password);
    if (!passwordMatch) {
      throw new AppError("Senha inv\xE1lida");
    }
    const token = (0, import_jsonwebtoken.sign)({
      email
    }, "23429ccdac6bcc82ef1d5af20b008fff", {
      subject: client.id,
      expiresIn: "7d"
    });
    return {
      jwt: token,
      user: {
        name: client.name,
        lastname: client.lastname,
        photo: client.avatar,
        username: client.username,
        email: client.email
      }
    };
  }
};
__name(AuthenticateClientUseCase, "AuthenticateClientUseCase");

// src/modules/account/useCases/auth/AuthenticateClientController.ts
var AuthenticateClientController = class {
  async handle(request, response) {
    const { email, password } = request.body;
    const authenticateClientUseCase = new AuthenticateClientUseCase();
    const result = await authenticateClientUseCase.execute({
      email,
      password
    });
    return response.json(result);
  }
};
__name(AuthenticateClientController, "AuthenticateClientController");

// src/routes/authenticate.routes.ts
var authenticateRouter = (0, import_express.Router)();
authenticateRouter.post("/", new AuthenticateClientController().handle);

// src/routes/cache.routes.ts
var import_express2 = require("express");
var cacheRouter = (0, import_express2.Router)();
cacheRouter.get("/clear", async (req, res) => {
  await redis.flushdb();
  res.json({
    message: "Cache cleaned!"
  });
});

// src/routes/client.routes.ts
var import_express3 = require("express");

// src/middlewares/ensureAuthenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");

// src/config/auth.ts
var auth_default = {
  secret_token: "23429ccdac6bcc82ef1d5af20b008fff",
  expires_in_token: "7d"
};

// src/middlewares/ensureAuthenticated.ts
async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 403);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: client_id } = (0, import_jsonwebtoken2.verify)(token, auth_default.secret_token);
    req.user = {
      id: client_id
    };
    next();
  } catch {
    throw new AppError("Invalid token!");
  }
}
__name(ensureAuthenticated, "ensureAuthenticated");

// src/routes/client.routes.ts
var import_multer2 = __toESM(require("multer"));

// src/modules/clients/useCases/createClient/CreateClientUseCase.ts
var import_bcrypt2 = require("bcrypt");
var import_cloudinary = require("cloudinary");
var import_fs = __toESM(require("fs"));
var import_path2 = require("path");
var import_stripe = __toESM(require("stripe"));

// src/config/upload.ts
var import_crypto = __toESM(require("crypto"));
var import_multer = __toESM(require("multer"));
var import_path = require("path");
var tmpFolder = (0, import_path.resolve)(__dirname, "..", "..", "tmp");
var upload_default = {
  tmpFolder,
  storage: import_multer.default.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = import_crypto.default.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    }
  })
};

// src/modules/clients/useCases/createClient/CreateClientUseCase.ts
var CreateClientUseCase = class {
  async execute({ email, username, avatar, password, name, lastname, cpf, cellphone, date, cep, logradouro, numero, complemento, referencia, bairro, cidade, UF }) {
    if (!process.env.STRIPE_KEY) {
      throw new AppError("Stripe key invalid!");
    }
    const stripe = new import_stripe.default(process.env.STRIPE_KEY, {
      apiVersion: "2022-08-01"
    });
    const clientExistsEmail = await prisma.client.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    });
    const clientExistsUsername = await prisma.client.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    });
    if (clientExistsEmail || clientExistsUsername) {
      throw new AppError("Client already Exists!", 403);
    }
    const hashPassword = await (0, import_bcrypt2.hash)(password, 10);
    let avatarImage;
    if (!!avatar) {
      const pathAvatar = (0, import_path2.resolve)(upload_default.tmpFolder, avatar);
      avatarImage = await import_cloudinary.v2.uploader.upload(pathAvatar, {
        folder: "avatars",
        secure: true,
        public_id: username
      }).catch(async (err) => {
        throw new AppError(err.message);
      }).finally(async () => {
        await import_fs.default.promises.unlink(pathAvatar);
      });
    }
    const customer = await stripe.customers.create({
      name: `${name} ${lastname}`,
      email,
      phone: cellphone,
      address: {
        line1: `${logradouro} ${numero}`,
        line2: `${complemento} ${referencia}`,
        city: cidade,
        state: UF
      }
    });
    const client = await prisma.client.create({
      data: {
        email,
        username,
        avatar: avatarImage?.url ?? null,
        password: hashPassword,
        name,
        lastname,
        cpf,
        cellphone,
        date,
        cep,
        logradouro,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        UF,
        id_customer: customer.id
      }
    });
    return {
      client,
      customer
    };
  }
};
__name(CreateClientUseCase, "CreateClientUseCase");

// src/modules/clients/useCases/createClient/CreateClientController.ts
var CreateClientController = class {
  async handle(req, res) {
    const avatar = req.file?.filename;
    const { email, username, password, name, lastname, cpf, cellphone, date, cep, logradouro, numero, complemento, referencia, bairro, cidade, UF } = req.body;
    const createClientUseCase = new CreateClientUseCase();
    const result = await createClientUseCase.execute({
      email,
      username,
      avatar: avatar ?? null,
      password,
      name,
      lastname,
      cpf,
      cellphone,
      date,
      cep,
      logradouro,
      numero,
      complemento,
      referencia,
      bairro,
      cidade,
      UF
    });
    return res.status(201).json(result);
  }
};
__name(CreateClientController, "CreateClientController");

// src/modules/clients/useCases/findClient/FindClientUseCase.ts
var FindClientUseCase = class {
  async execute({ client_id }) {
    const client = prisma.client.findFirst({
      where: {
        id: client_id
      },
      include: {
        order: true,
        games_favorites: true
      }
    });
    if (!client) {
      throw new AppError("Client does not Exists!");
    }
    return client;
  }
};
__name(FindClientUseCase, "FindClientUseCase");

// src/modules/clients/useCases/findClient/FindClientController.ts
var FindClientController = class {
  async handle(req, res) {
    const { user } = req;
    const findClientUseCase = new FindClientUseCase();
    const result = await findClientUseCase.execute({
      client_id: user.id
    });
    return res.status(201).json(result);
  }
};
__name(FindClientController, "FindClientController");

// src/modules/clients/useCases/findClientForCreate/FindClientForCreateUseCase.ts
var FindClientForCreateUseCase = class {
  async execute({ email, username }) {
    const clientEmail = await prisma.client.findFirst({
      where: {
        email
      }
    });
    const clientUser = await prisma.client.findFirst({
      where: {
        username
      }
    });
    if (clientEmail && clientUser) {
      throw new AppError("Client already Exists!");
    }
    if (clientEmail && !clientUser) {
      throw new AppError("Email already Exists!");
    }
    if (clientUser && !clientEmail) {
      throw new AppError("Username already Exists!");
    }
    return {
      ok: true
    };
  }
};
__name(FindClientForCreateUseCase, "FindClientForCreateUseCase");

// src/modules/clients/useCases/findClientForCreate/FindClientForCreateController.ts
var FindClientForCreateController = class {
  async handle(req, res) {
    const { email, username } = req.body;
    const findClientForCreateUseCase = new FindClientForCreateUseCase();
    const result = await findClientForCreateUseCase.execute({
      email,
      username
    });
    return res.status(201).json(result);
  }
};
__name(FindClientForCreateController, "FindClientForCreateController");

// src/modules/clients/useCases/uploadAvatarClient/UploadAvatarClientUseCase.ts
var import_cloudinary2 = require("cloudinary");
var import_fs2 = __toESM(require("fs"));
var import_path3 = require("path");
var UploadAvatarClientUseCase = class {
  async execute({ avatar, client_id }) {
    const clientExistsEmail = await prisma.client.findFirst({
      where: {
        id: client_id
      }
    });
    if (!clientExistsEmail) {
      throw new AppError("Client does not Exists!", 403);
    }
    let avatarImage;
    if (!!avatar) {
      const pathAvatar = (0, import_path3.resolve)(upload_default.tmpFolder, avatar);
      avatarImage = await import_cloudinary2.v2.uploader.upload(pathAvatar, {
        folder: "avatars",
        secure: true,
        public_id: clientExistsEmail.username
      }).catch(async (err) => {
        throw new AppError(err.message);
      }).finally(async () => {
        await import_fs2.default.promises.unlink(pathAvatar);
      });
    }
    const client = await prisma.client.update({
      where: {
        id: client_id
      },
      data: {
        avatar: avatarImage?.url ?? null
      }
    });
    return client;
  }
};
__name(UploadAvatarClientUseCase, "UploadAvatarClientUseCase");

// src/modules/clients/useCases/uploadAvatarClient/UploadAvatarClientController.ts
var UploadAvatarClientController = class {
  async handle(req, res) {
    const { user } = req;
    let avatar;
    if (!!req.file) {
      avatar = req.file.filename;
    }
    const uploadAvatarClientUseCase = new UploadAvatarClientUseCase();
    const result = await uploadAvatarClientUseCase.execute({
      client_id: user.id,
      avatar: !!avatar ? avatar : null
    });
    return res.status(201).json(result);
  }
};
__name(UploadAvatarClientController, "UploadAvatarClientController");

// src/routes/client.routes.ts
var clientRouter = (0, import_express3.Router)();
var upload = (0, import_multer2.default)(upload_default);
clientRouter.get("/me", ensureAuthenticated, new FindClientController().handle);
clientRouter.post("/exist", new FindClientForCreateController().handle);
clientRouter.post("/", upload.single("avatar"), new CreateClientController().handle);
clientRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), new UploadAvatarClientController().handle);

// src/routes/developer.routes.ts
var import_express4 = require("express");

// src/modules/developers/useCases/createDeveloper/CreateDeveloperUseCase.ts
var CreateDeveloperUseCase = class {
  async execute({ name, slug }) {
    const developerExists = await prisma.developer.findFirst({
      where: {
        slug
      }
    });
    if (developerExists) {
      throw new AppError("Developer already Exists!");
    }
    await redis.flushdb();
    const developer = await prisma.developer.create({
      data: {
        name,
        slug
      }
    });
    return developer;
  }
};
__name(CreateDeveloperUseCase, "CreateDeveloperUseCase");

// src/modules/developers/useCases/createDeveloper/CreateDeveloperController.ts
var CreateDeveloperController = class {
  async handle(req, res) {
    const { name, slug } = req.body;
    const createDeveloperUseCase = new CreateDeveloperUseCase();
    const result = await createDeveloperUseCase.execute({
      name,
      slug
    });
    return res.status(201).json(result);
  }
};
__name(CreateDeveloperController, "CreateDeveloperController");

// src/routes/developer.routes.ts
var developerRouter = (0, import_express4.Router)();
developerRouter.post("/", new CreateDeveloperController().handle);

// src/routes/gallery.routes.ts
var import_express5 = require("express");
var import_multer3 = __toESM(require("multer"));

// src/modules/gallery/useCases/createGallery/CreateGalleryUseCase.ts
var import_config = require("dotenv/config");
var import_cloudinary3 = require("cloudinary");
var import_fs3 = __toESM(require("fs"));
var import_path4 = require("path");
var CreateGalleryUseCase = class {
  async execute({ image, alt, image_fit, width, height, type, games_id }) {
    const pathImage = (0, import_path4.resolve)(upload_default.tmpFolder, image);
    await redis.flushdb();
    const game = await prisma.game.findFirst({
      where: {
        id: games_id
      },
      select: {
        slug: true
      }
    });
    const gameImage = await import_cloudinary3.v2.uploader.upload(pathImage, {
      folder: `gamesGallery/${game?.slug}`,
      secure: true,
      resource_type: "auto"
    }).catch(async (err) => {
      throw new AppError(err.message);
    }).finally(async () => {
      await import_fs3.default.promises.unlink(pathImage);
    });
    const imageCard = await prisma.game_Gallery.create({
      data: {
        src: gameImage.url,
        alt,
        image_fit,
        width: +width,
        height: +height,
        type,
        games_id
      }
    });
    return imageCard;
  }
};
__name(CreateGalleryUseCase, "CreateGalleryUseCase");

// src/modules/gallery/useCases/createGallery/CreateGalleryController.ts
var CreateGalleryController = class {
  async handle(req, res) {
    const image = req.file?.filename;
    const { alt, image_fit, width, height, type, games_id } = req.body;
    if (!image) {
      throw new AppError("Image error");
    }
    const createGalleryUseCase = new CreateGalleryUseCase();
    const result = await createGalleryUseCase.execute({
      image,
      alt,
      image_fit,
      width,
      height,
      type,
      games_id
    });
    return res.status(201).json(result);
  }
};
__name(CreateGalleryController, "CreateGalleryController");

// src/routes/gallery.routes.ts
var galleryRouter = (0, import_express5.Router)();
var upload2 = (0, import_multer3.default)(upload_default);
galleryRouter.post("/", upload2.single("image"), new CreateGalleryController().handle);

// src/routes/game.routes.ts
var import_express6 = require("express");
var import_multer4 = __toESM(require("multer"));

// src/modules/games/useCases/createFavoriteGame/CreateFavoriteGameUseCase.ts
var CreateFavoriteGameUseCase = class {
  async execute({ client_id, game_id }) {
    await redis.flushdb();
    const gameCreated = await prisma.game_Favorite.upsert({
      where: {
        client_id
      },
      create: {
        client_id,
        games: {
          connect: {
            id: game_id
          }
        }
      },
      update: {
        games: {
          connect: {
            id: game_id
          }
        }
      },
      select: {
        games: {
          select: {
            id: true,
            name: true,
            slug: true,
            release_date: true,
            genres: true,
            developers: true,
            image: true,
            score: true,
            price: true,
            platforms: true,
            primary_color: true
          }
        }
      }
    });
    return gameCreated.games;
  }
};
__name(CreateFavoriteGameUseCase, "CreateFavoriteGameUseCase");

// src/modules/games/useCases/createFavoriteGame/CreateFavoriteGameController.ts
var CreateFavoriteGameController = class {
  async handle(req, res) {
    const { user } = req;
    const { game_id } = req.body;
    const createFavoriteGameUseCase = new CreateFavoriteGameUseCase();
    const result = await createFavoriteGameUseCase.execute({
      client_id: user.id,
      game_id
    });
    return res.status(201).json(result);
  }
};
__name(CreateFavoriteGameController, "CreateFavoriteGameController");

// src/modules/games/useCases/createGame/CreateGameUseCase.ts
var import_cloudinary4 = require("cloudinary");
var import_fs4 = __toESM(require("fs"));
var import_path5 = require("path");
var Vibrant = require("node-vibrant");
var CreateGameUseCase = class {
  async execute({ name, slug, release_date, score, video, image, background, description, price, genres, developers, platforms }) {
    await redis.flushdb();
    const pathImage = (0, import_path5.resolve)(upload_default.tmpFolder, image);
    const pathBackground = (0, import_path5.resolve)(upload_default.tmpFolder, background);
    const color = await Vibrant.from(pathImage).getPalette();
    if (!color.LightMuted?.hex) {
      throw new AppError("Error generate primary color");
    }
    const imageCard = await import_cloudinary4.v2.uploader.upload(pathImage, {
      folder: `imagesCard/${slug}`,
      secure: true
    }).catch(async (err) => {
      throw new AppError(err.message);
    }).finally(async () => {
      await import_fs4.default.promises.unlink(pathImage);
    });
    const imageBackground = await import_cloudinary4.v2.uploader.upload(pathBackground, {
      folder: `imagesBackground/${slug}`,
      secure: true
    }).catch(async (err) => {
      throw new AppError(err.message);
    }).finally(async () => {
      await import_fs4.default.promises.unlink(pathBackground);
    });
    let imageVideo;
    if (video) {
      const pathVideo = (0, import_path5.resolve)(upload_default.tmpFolder, video);
      imageVideo = await import_cloudinary4.v2.uploader.upload(pathVideo, {
        folder: `videosBackground/${slug}`,
        secure: true,
        resource_type: "video"
      }).catch(async (err) => {
        throw new AppError(err.message);
      }).finally(async () => {
        await import_fs4.default.promises.unlink(pathVideo);
      });
    }
    const game = await prisma.game.upsert({
      where: {
        name
      },
      create: {
        name,
        slug,
        release_date,
        score: +score,
        video: !!imageVideo?.url ? imageVideo?.url : null,
        image: imageCard.url,
        primary_color: color.LightMuted?.hex,
        background: imageBackground.url,
        description,
        price: +price,
        genres: {
          connect: genres.map((genre) => ({
            id: genre
          }))
        },
        developers: {
          connect: developers.map((developer) => ({
            id: developer
          }))
        },
        platforms: {
          connect: platforms.map((platform) => ({
            id: platform
          }))
        }
      },
      update: {
        slug,
        release_date,
        score: +score,
        video: !!imageVideo?.url ? imageVideo?.url : null,
        image: imageCard.url,
        primary_color: color.LightMuted?.hex,
        background: imageBackground.url,
        description,
        price: +price,
        genres: {
          connect: genres.map((genre) => ({
            id: genre
          }))
        },
        developers: {
          connect: developers.map((developer) => ({
            id: developer
          }))
        },
        platforms: {
          connect: platforms.map((platform) => ({
            id: platform
          }))
        }
      },
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        order: true
      }
    }).catch((err) => {
      throw new AppError(err.message);
    });
    return game;
  }
};
__name(CreateGameUseCase, "CreateGameUseCase");

// src/modules/games/useCases/createGame/CreateGameController.ts
var CreateGameController = class {
  async handle(req, res) {
    const files = req.files;
    if (!files["imageCard"][0]) {
      throw new AppError("Image Card error!");
    }
    if (!files["background"][0]) {
      throw new AppError("Background error!");
    }
    if (!files["video"]) {
      console.log("Video Empty");
    }
    const { name, slug, release_date, score, description, price, genres, developers, platforms } = req.body;
    let video = null;
    if (files["video"]) {
      video = files["video"][0].path;
    }
    const createGameUseCase = new CreateGameUseCase();
    const result = await createGameUseCase.execute({
      name,
      slug,
      release_date,
      score,
      video,
      image: files["imageCard"][0].path,
      background: files["background"][0].path,
      description,
      price,
      genres,
      developers,
      platforms
    });
    return res.status(201).json(result);
  }
};
__name(CreateGameController, "CreateGameController");

// src/modules/games/useCases/deleteFavoriteGame/DeleteFavoriteGameUseCase.ts
var DeleteFavoriteGameUseCase = class {
  async execute({ client_id, game_id }) {
    await redis.flushdb();
    const gameDeleted = await prisma.game_Favorite.update({
      where: {
        client_id
      },
      data: {
        games: {
          disconnect: {
            id: game_id
          }
        }
      },
      select: {
        games: {
          select: {
            id: true,
            name: true,
            slug: true,
            release_date: true,
            genres: true,
            developers: true,
            image: true,
            score: true,
            price: true,
            platforms: true,
            primary_color: true
          }
        }
      }
    });
    return gameDeleted.games;
  }
};
__name(DeleteFavoriteGameUseCase, "DeleteFavoriteGameUseCase");

// src/modules/games/useCases/deleteFavoriteGame/DeleteFavoriteGameController.ts
var DeleteFavoriteGameController = class {
  async handle(req, res) {
    const { user } = req;
    const { game_id } = req.body;
    const deleteFavoriteGameUseCase = new DeleteFavoriteGameUseCase();
    const result = await deleteFavoriteGameUseCase.execute({
      client_id: user.id,
      game_id
    });
    return res.status(201).json(result);
  }
};
__name(DeleteFavoriteGameController, "DeleteFavoriteGameController");

// src/modules/games/useCases/findFavoritesGames/FindFavoritesGamesUseCase.ts
var FindFavoritesGamesUseCase = class {
  async execute({ page, client_id }) {
    const cacheKey = `games-favorites:user-${client_id}:page-${page}`;
    const cacheGames = await redis.get(cacheKey);
    if (cacheGames) {
      return JSON.parse(cacheGames);
    }
    const games = await prisma.game_Favorite.findMany({
      skip: !!page ? +page - 1 : 0,
      take: !!page ? +page * 12 : void 0,
      where: {
        client_id
      },
      select: {
        games: {
          select: {
            id: true,
            name: true,
            slug: true,
            release_date: true,
            genres: true,
            developers: true,
            image: true,
            score: true,
            price: true,
            platforms: true,
            primary_color: true
          }
        }
      }
    });
    const onlyGames = games.map((item) => item.games);
    await redis.set(cacheKey, JSON.stringify(onlyGames[0]));
    return onlyGames[0];
  }
};
__name(FindFavoritesGamesUseCase, "FindFavoritesGamesUseCase");

// src/modules/games/useCases/findFavoritesGames/FindFavoritesGamesController.ts
var FindFavoritesGamesController = class {
  async handle(req, res) {
    const { page } = req.query;
    const { user } = req;
    const findFavoritesGamesUseCase = new FindFavoritesGamesUseCase();
    const result = await findFavoritesGamesUseCase.execute({
      page,
      client_id: user.id
    });
    return res.status(201).json(result);
  }
};
__name(FindFavoritesGamesController, "FindFavoritesGamesController");

// src/modules/games/useCases/findGameById/FindGameByIdUseCase.ts
var FindGameByIdUseCase = class {
  async execute({ id }) {
    const game = await prisma.game.findUnique({
      where: {
        id
      },
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        order: true,
        pc_system: {
          select: {
            minimal: true,
            recommended: true
          }
        }
      }
    });
    return game;
  }
};
__name(FindGameByIdUseCase, "FindGameByIdUseCase");

// src/modules/games/useCases/findGameById/FindGameByIdController.ts
var FindGameByIdController = class {
  async handle(req, res) {
    const { id } = req.params;
    const findGameByIdUseCase = new FindGameByIdUseCase();
    const result = await findGameByIdUseCase.execute({
      id
    });
    return res.status(201).json(result);
  }
};
__name(FindGameByIdController, "FindGameByIdController");

// src/modules/games/useCases/findGameBySlug/FindGameBySlugUseCase.ts
var FindGameBySlugUseCase = class {
  async execute({ slug }) {
    const game = await prisma.game.findFirst({
      where: {
        slug
      },
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        order: true,
        pc_system: {
          select: {
            minimal: true,
            recommended: true
          }
        }
      }
    });
    return game;
  }
};
__name(FindGameBySlugUseCase, "FindGameBySlugUseCase");

// src/modules/games/useCases/findGameBySlug/FindGameBySlugController.ts
var FindGameBySlugController = class {
  async handle(req, res) {
    const { slug } = req.params;
    const findGameBySlugUseCase = new FindGameBySlugUseCase();
    const result = await findGameBySlugUseCase.execute({
      slug
    });
    return res.status(201).json(result);
  }
};
__name(FindGameBySlugController, "FindGameBySlugController");

// src/modules/games/useCases/findGames/FindGamesUseCase.ts
var FindGamesUseCase = class {
  async execute({ page }) {
    const cacheKey = `games:page-${page}`;
    const cacheGames = await redis.get(cacheKey);
    if (cacheGames) {
      return JSON.parse(cacheGames);
    }
    const games = await prisma.game.findMany({
      skip: !!page ? +page - 1 : 0,
      take: !!page ? +page * 12 : void 0,
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        pc_system: {
          select: {
            minimal: true,
            recommended: true
          }
        }
      }
    });
    await redis.set(cacheKey, JSON.stringify(games));
    return games;
  }
};
__name(FindGamesUseCase, "FindGamesUseCase");

// src/modules/games/useCases/findGames/FindGamesController.ts
var FindGamesController = class {
  async handle(req, res) {
    const { page } = req.query;
    const findGamesUseCase = new FindGamesUseCase();
    const result = await findGamesUseCase.execute({
      page
    });
    return res.status(201).json(result);
  }
};
__name(FindGamesController, "FindGamesController");

// src/routes/game.routes.ts
var upload3 = (0, import_multer4.default)(upload_default);
var gameRouter = (0, import_express6.Router)();
gameRouter.get("/", new FindGamesController().handle);
gameRouter.get("/id/:id", new FindGameByIdController().handle);
gameRouter.get("/slug/:slug", new FindGameBySlugController().handle);
gameRouter.post("/", upload3.fields([
  {
    name: "imageCard",
    maxCount: 1
  },
  {
    name: "background",
    maxCount: 1
  },
  {
    name: "video",
    maxCount: 1
  }
]), new CreateGameController().handle);
gameRouter.get("/favorite", ensureAuthenticated, new FindFavoritesGamesController().handle);
gameRouter.post("/favorite", ensureAuthenticated, new CreateFavoriteGameController().handle);
gameRouter.put("/favorite", ensureAuthenticated, new DeleteFavoriteGameController().handle);

// src/routes/genre.routes.ts
var import_express7 = require("express");

// src/modules/genres/useCases/createGenre/CreateGenreUseCase.ts
var CreateGenreUseCase = class {
  async execute({ name, slug }) {
    const genreExists = await prisma.genre.findFirst({
      where: {
        slug
      }
    });
    if (genreExists) {
      throw new AppError("Genre already Exists!");
    }
    await redis.flushdb();
    const genre = await prisma.genre.create({
      data: {
        name,
        slug
      }
    });
    return genre;
  }
};
__name(CreateGenreUseCase, "CreateGenreUseCase");

// src/modules/genres/useCases/createGenre/CreateGenreController.ts
var CreateGenreController = class {
  async handle(req, res) {
    const { name, slug } = req.body;
    const createGenreUseCase = new CreateGenreUseCase();
    const result = await createGenreUseCase.execute({
      name,
      slug
    });
    return res.status(201).json(result);
  }
};
__name(CreateGenreController, "CreateGenreController");

// src/routes/genre.routes.ts
var genreRouter = (0, import_express7.Router)();
genreRouter.post("/", new CreateGenreController().handle);

// src/routes/order.routes.ts
var import_express8 = require("express");

// src/modules/orders/useCases/createOrder/CreateOrderUseCase.ts
var import_config2 = require("dotenv/config");
var import_stripe2 = __toESM(require("stripe"));
var CreateOrderUseCase = class {
  async execute({ client_id, cart, paymentIntentId, paymentMethod }) {
    if (!process.env.STRIPE_KEY) {
      throw new AppError("Stripe key invalid!");
    }
    const stripe = new import_stripe2.default(process.env.STRIPE_KEY, {
      apiVersion: "2022-08-01"
    });
    const games = await prisma.game.findMany({
      where: {
        id: {
          in: cart
        }
      }
    });
    const total_in_cents = Number((games.reduce((acc, game) => acc + game.price, 0) * 100).toFixed(0));
    let paymentInfo;
    try {
      paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod);
    } catch (err) {
      throw new AppError(err.message);
    }
    if (!paymentInfo.card) {
      throw new AppError("Card invalid!");
    }
    const order = await prisma.order.create({
      data: {
        total_in_cents,
        client_id,
        payment_intent_id: paymentIntentId,
        card_brand: paymentInfo.card.brand,
        card_last4: paymentInfo.card.last4,
        games: {
          connect: [
            ...cart.map((cart2) => ({
              id: cart2
            }))
          ]
        }
      },
      select: {
        games: true
      }
    });
    return order;
  }
};
__name(CreateOrderUseCase, "CreateOrderUseCase");

// src/modules/orders/useCases/createOrder/CreateOrderController.ts
var CreateOrderController = class {
  async handle(req, res) {
    const { user } = req;
    const { cart, paymentIntentId, paymentMethod } = req.body;
    const createOrderUseCase = new CreateOrderUseCase();
    const result = await createOrderUseCase.execute({
      client_id: user.id,
      cart,
      paymentIntentId,
      paymentMethod
    });
    return res.status(201).json(result);
  }
};
__name(CreateOrderController, "CreateOrderController");

// src/modules/orders/useCases/createPaymentIntent/CreatePaymentIntentUseCase.ts
var import_config3 = require("dotenv/config");
var import_stripe3 = __toESM(require("stripe"));
var CreatePaymentIntentUseCase = class {
  async execute({ cart, client_id }) {
    if (!process.env.STRIPE_KEY) {
      throw new AppError("Stripe key invalid!");
    }
    const stripe = new import_stripe3.default(process.env.STRIPE_KEY, {
      apiVersion: "2022-08-01"
    });
    const games = await prisma.game.findMany({
      where: {
        id: {
          in: cart
        }
      }
    });
    const client = await prisma.client.findUnique({
      where: {
        id: client_id
      }
    });
    if (!games.length) {
      throw new AppError("No valid games found!");
    }
    const total_in_cents = Number((games.reduce((acc, game) => acc + game.price, 0) * 100).toFixed(0));
    if (!client?.id_customer) {
      throw new AppError("Invalid Customer Id!");
    }
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_in_cents,
        customer: client.id_customer,
        currency: "BRL",
        metadata: {
          games: JSON.stringify(games.map((game) => game.id))
        }
      });
      return paymentIntent;
    } catch (err) {
      throw new AppError(err);
    }
  }
};
__name(CreatePaymentIntentUseCase, "CreatePaymentIntentUseCase");

// src/modules/orders/useCases/createPaymentIntent/CreatePaymentIntentController.ts
var CreatePaymentIntentController = class {
  async handle(req, res) {
    const { user } = req;
    const { cart } = req.body;
    const createPaymentIntentUseCase = new CreatePaymentIntentUseCase();
    const result = await createPaymentIntentUseCase.execute({
      cart,
      client_id: user.id
    });
    return res.status(201).json(result);
  }
};
__name(CreatePaymentIntentController, "CreatePaymentIntentController");

// src/modules/orders/useCases/findOrdersMe/FindOrdersMeUseCase.ts
var FindOrdersMeUseCase = class {
  async execute({ client_id }) {
    const order = prisma.order.findMany({
      where: {
        client_id
      },
      select: {
        total_in_cents: true,
        card_brand: true,
        card_last4: true,
        created_at: true,
        games: {
          include: {
            genres: true,
            developers: true,
            platforms: true
          }
        }
      }
    });
    if (!order) {
      throw new AppError("Order does not Found!");
    }
    return order;
  }
};
__name(FindOrdersMeUseCase, "FindOrdersMeUseCase");

// src/modules/orders/useCases/findOrdersMe/FindOrdersMeController.ts
var FindOrdersMeController = class {
  async handle(req, res) {
    const { user } = req;
    const findOrdersMeUseCase = new FindOrdersMeUseCase();
    const result = await findOrdersMeUseCase.execute({
      client_id: user.id
    });
    return res.status(201).json(result);
  }
};
__name(FindOrdersMeController, "FindOrdersMeController");

// src/routes/order.routes.ts
var orderRouter = (0, import_express8.Router)();
orderRouter.get("/", ensureAuthenticated, new FindOrdersMeController().handle);
orderRouter.post("/", ensureAuthenticated, new CreateOrderController().handle);
orderRouter.post("/payment-intent", ensureAuthenticated, new CreatePaymentIntentController().handle);

// src/routes/platform.routes.ts
var import_express9 = require("express");

// src/modules/platforms/useCases/createPlatform/CreatePlatformUseCase.ts
var CreatePlatformUseCase = class {
  async execute({ name, slug }) {
    const platformExists = await prisma.platform.findFirst({
      where: {
        slug
      }
    });
    if (platformExists) {
      throw new AppError("Platform already Exists!");
    }
    await redis.flushdb();
    const platform = await prisma.platform.create({
      data: {
        name,
        slug
      }
    });
    return platform;
  }
};
__name(CreatePlatformUseCase, "CreatePlatformUseCase");

// src/modules/platforms/useCases/createPlatform/CreatePlatformController.ts
var CreatePlatformController = class {
  async handle(req, res) {
    const { name, slug } = req.body;
    const createPlatformUseCase = new CreatePlatformUseCase();
    const result = await createPlatformUseCase.execute({
      name,
      slug
    });
    return res.status(201).json(result);
  }
};
__name(CreatePlatformController, "CreatePlatformController");

// src/routes/platform.routes.ts
var platformRouter = (0, import_express9.Router)();
platformRouter.post("/", new CreatePlatformController().handle);

// src/routes/system.routes.ts
var import_express10 = require("express");

// src/modules/system/useCases/createPcSystem/CreatePcSystemUseCase.ts
var CreatePcSystemUseCase = class {
  async execute({ game_id, minimal, recommended }) {
    const platformExists = await prisma.pcSystem.findFirst({
      where: {
        game_id
      }
    });
    if (platformExists) {
      throw new AppError("Pc system already Exists!");
    }
    await redis.flushdb();
    const platform = await prisma.pcSystem.create({
      data: {
        game_id,
        minimal: {
          create: minimal
        },
        recommended: {
          create: recommended
        }
      }
    });
    return platform;
  }
};
__name(CreatePcSystemUseCase, "CreatePcSystemUseCase");

// src/modules/system/useCases/createPcSystem/CreatePcSystemController.ts
var CreatePcSystemController = class {
  async handle(req, res) {
    const { game_id, minimal, recommended } = req.body;
    const createPcSystemUseCase = new CreatePcSystemUseCase();
    const result = await createPcSystemUseCase.execute({
      game_id,
      minimal,
      recommended
    });
    return res.status(201).json(result);
  }
};
__name(CreatePcSystemController, "CreatePcSystemController");

// src/routes/system.routes.ts
var pcSystemRouter = (0, import_express10.Router)();
pcSystemRouter.post("/", new CreatePcSystemController().handle);

// src/routes/index.ts
var router = (0, import_express11.Router)();
router.use("/client", clientRouter);
router.use("/auth", authenticateRouter);
router.use("/order", orderRouter);
router.use("/game", gameRouter);
router.use("/genre", genreRouter);
router.use("/gallery", galleryRouter);
router.use("/developer", developerRouter);
router.use("/platform", platformRouter);
router.use("/system", pcSystemRouter);
router.use("/cache", cacheRouter);

// src/server.ts
var app = (0, import_express12.default)();
app.use((0, import_cors.default)({
  origin: "*",
  credentials: true
}));
app.use(import_express12.default.json());
app.use(router);
app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});
app.listen(3333, () => {
  console.log("Server is Running \u{1F680}");
});

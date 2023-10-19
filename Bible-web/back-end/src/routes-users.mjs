import bcrypt from "bcrypt";
import { findUser, insertUser, upDateFavorite } from "./mongoDB.mjs";

async function getPasswordCrypted(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //console.log("Password criptata:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}

async function comparePassword(PlaintTexPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(PlaintTexPassword, hashedPassword);
    //console.log('Le password corrispondono?', isMatch);
    return isMatch;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}
export const login = async (req, res) => {
  try {
    //console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    //console.log(response.password);
    const user = await findUser(username);
    console.log("sono nella get user gestisci....", user);

    if (user) {
      const checkPassword = await comparePassword(password, user.password);
      if (checkPassword) {
        req.session.user = username;
        console.log("sono nel route user", req.session.user);
        res.status(200).send({
          data: user,
          check: true,
          message: "authenticated user",
        });
      } else {
        res.status(403).send({
          data: {},
          error: true,
          message: "user not found",
        });
      }
    } else {
      res.status(403).send({
        data: {},
        error: true,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy(function err() {
      res.status(200).send({
        check: true,
        message: "user not logged in",
      });
    });
  } catch (error) {
    console.log(error);
  }
};


export const signup = async (req, res) => {
  try {
    const userToAdd = req.body;
    console.log(userToAdd.password);

    const newUsername = userToAdd.username;
    const user = await findUser(newUsername);
    if (!user) {
      const cryptPassword = await getPasswordCrypted(userToAdd.password);
      userToAdd.password = cryptPassword;
      userToAdd["favoriteVerses"] = [];
      insertUser(userToAdd);
      res.status(201).send({
        check: true,
        message: "user created",
      });
    } else {
      res.status(200).send({
        data: {},
        error: true,
        message: "user already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: {},
      error: true,
      message: "server problems",
    });
  }
};

export const upDateFavoritesVerse = async (req, res) => {
  try {
    const userToFind = req.params.username;
    const newfavorite = req.body;
    console.log(userToFind);
    console.log(newfavorite);
    const user = await findUser(userToFind);
    if (user) {
      const favorites = user.favoriteVerses;
      const checkFavorite = favorites.filter(
        (el) => el.verse == newfavorite.verse
      );
      if (checkFavorite.length > 0) {
        res
          .status(200)
          .send({
            data: {},
            error: true,
            message: "resource already exist",
          })
          .end();
        return;
      }
      favorites.push(newfavorite);
      await upDateFavorite(userToFind, favorites);
      res.status(201).send({
        data: favorites,
        message: "resource Added",
        check: true,
      });
    } else {
      res.status(200).send({
        data: {},
        error: true,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFavoritesVerse = async (req, res) => {
  try {
    //console.log(req.body);
    const userToFind = req.params.username;
    //console.log(userToFind);
    const favoriteToRemove = req.body;
    console.log(favoriteToRemove);
    const user = await findUser(userToFind);
    if (user) {
      const favorites = user.favoriteVerses;
      const checkFavorite = favorites.filter(
        (el) => el.verse == favoriteToRemove.verse
      );
      if ((checkFavorite.length = 0)) {
        res
          .status(200)
          .send({
            data: {},
            error: true,
            message: "resource not found",
          })
          .end();
        return;
      }
      console.log(favorites);
      const newFavorite = favorites.filter(
        (el) => el.verse != favoriteToRemove.verse
      );
      await upDateFavorite(userToFind, newFavorite);
      res.status(201).send({
        data: newFavorite,
        message: "modified resource",
        check: true,
      });
    } else {
      res.status(200).send({
        data: {},
        error: true,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

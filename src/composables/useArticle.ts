import { http } from "src/services/http/client";
import { useGlobal } from "src/composables/useGlobal";
import { reactive, toRefs } from "vue";
import router from "src/router/index";
import { Notify } from "quasar";
import { Article, ArticleParam, Comment } from "./types/article";
import { parseError } from "src/Utils/ErrorHandling";
import { ArticleType } from "./types/global";

const { setButtonLoading } = useGlobal();

interface State {
  article: Article;
  articles: Article[];
  userArticles: Article[];
  comments: Comment[];
  commentsLoading: boolean;
  articlesLoading: boolean;
  generalArticlesCount: number;
  userArticlesCount: number;
  publishArticleErrorMessage: string[];
  postCommentErrorMessage: string[];
  favoriteLoading: boolean;
}

const articleState: State = reactive({
  article: {} as Article,
  articles: [],
  userArticles: [],
  comments: [],
  commentsLoading: false,
  articlesLoading: false,
  generalArticlesCount: 0,
  userArticlesCount: 0,
  publishArticleErrorMessage: [],
  postCommentErrorMessage: [],
  favoriteLoading: false,
});

export const useArticle = () => {
  const getAllGeneralArticles = async (limit = 10, offset = 0) => {
    articleState.articlesLoading = true;
    try {
      const { data } = await http.get<
        any,
        { data: { articles: Article[]; articlesCount: number } }
      >(`/articles?limit=${limit}&offset=${offset}`, {});
      articleState.articles = [...data.articles];
      articleState.generalArticlesCount = Math.ceil(data.articlesCount / limit);
      articleState.articlesLoading = false;
    } catch (error: any) {
      Notify.create({
        message: parseError(error?.response.data.errors).join(","),
        type: "negative",
      });
      articleState.articlesLoading = false;
    }
  };

  const getAllFeedArticles = async (limit: number = 10, offset: number = 0) => {
    articleState.articlesLoading = true;
    try {
      const { data } = await http.get<
        any,
        { data: { articles: Article[]; articlesCount: number } }
      >(`/articles/feed?limit=${limit}&offset=${offset}`, {});
      articleState.userArticles = [...data.articles];
      articleState.userArticlesCount = Math.ceil(data.articlesCount / limit);
      articleState.articlesLoading = false;
    } catch (error: any) {
      Notify.create({
        message: parseError(error?.response.data.errors).join(","),
        type: "negative",
      });
      articleState.articlesLoading = false;
    }
  };

  const getSingleArticle = async (param: string) => {
    articleState.articlesLoading = true;
    try {
      const { data } = await http.get<any, { data: { article: Article } }>(
        `/articles/${param}`,
        {}
      );

      articleState.article = data.article;
      articleState.articlesLoading = false;
    } catch (error: any) {
      Notify.create({
        message: parseError(error?.response.data.errors).join(","),
        type: "negative",
      });
      articleState.articlesLoading = false;
    }
  };

  const getArticleComments = async (slug: string) => {
    articleState.commentsLoading = true;
    try {
      const { data } = await http.get<any, { data: { comments: Comment[] } }>(
        `/articles/${slug}/comments`,
        {}
      );
      articleState.comments = [...data.comments];
      articleState.commentsLoading = false;
    } catch (error: any) {
      Notify.create({
        message: parseError(error?.response.data.errors).join(","),
        type: "negative",
      });
      articleState.commentsLoading = false;
    }
  };

  const PostComment = async (body: object, slug: string) => {
    setButtonLoading(true);
    try {
      const { data, status } = await http.post<
        any,
        { data: { article: ArticleParam }; status: any }
      >(`/articles/${slug}/comments`, { comment: body });
      articleState.postCommentErrorMessage = [];
      setButtonLoading(false);
      getArticleComments(slug);
    } catch (error: any) {
      articleState.postCommentErrorMessage = parseError(
        error?.response.data.errors
      );
      setButtonLoading(false);
    }
  };

  const createArticle = async (params: ArticleParam) => {
    setButtonLoading(true);
    try {
      const { data, status } = await http.post<
        any,
        { data: { article: ArticleParam }; status: any }
      >("/articles", { article: params });
      articleState.publishArticleErrorMessage = [];
      setButtonLoading(false);
      router.push({ name: "Articles" });
    } catch (error: any) {
      articleState.publishArticleErrorMessage = parseError(
        error?.response.data.errors
      );
      setButtonLoading(false);
    }
  };

  const favoriteAnArticle = async (slug: string, type: ArticleType) => {
    articleState.favoriteLoading = true;
    try {
      const { data, status } = await http.post<
        any,
        { data: { article: Article }; status: any }
      >(`/articles/${slug}/favorite`, {});
      let newArticle = data.article;

      if (type === ArticleType.GLOBAL) {
        articleState.articles = [
          ...articleState.articles.map((item) => {
            if (item.slug === newArticle.slug) return { ...newArticle };
            else return item;
          }),
        ];
      } else {
        articleState.userArticles = [
          ...articleState.articles.map((item) => {
            if (item.slug === newArticle.slug) return { ...newArticle };
            else return item;
          }),
        ];
      }
      articleState.favoriteLoading = false;
    } catch (error: any) {
      parseError(error?.response.data.errors);

      articleState.favoriteLoading = false;
    }
  };

  return {
    getAllGeneralArticles,
    getAllFeedArticles,
    getSingleArticle,
    getArticleComments,
    PostComment,
    createArticle,
    favoriteAnArticle,
    ...toRefs(articleState),
  };
};

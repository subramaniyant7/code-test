export type AboutProps = {
  success?: boolean;
  data?: {
    info: string;
  };
};

export type AboutData = {
  info: string;
};

export type ProfileProps = {
  success?: boolean;
  data?: {
    fullname: string;
    email: string;
    avatar: string;
  };
};

export type ProfileInfo = {
  fullname: string;
  email: string;
  avatar: string;
};

export type ProfileInfoLoading = {
  author: boolean;
  quote: boolean;
};

export type AuthorInfo = {
  authorId: string;
  name: string;
};

export type QuoteInfo = {
  quoteId: string;
  authorId: string;
  quote: string;
};

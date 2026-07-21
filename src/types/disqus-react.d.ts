declare module 'disqus-react' {
  import * as React from 'react';

  export interface DiscussionEmbedProps {
    shortname: string;
    config: {
      url: string;
      identifier: string;
      title: string;
      language?: string;
    };
  }

  export class DiscussionEmbed extends React.Component<DiscussionEmbedProps> {}

  export interface CommentCountProps {
    shortname: string;
    config: {
      url: string;
      identifier: string;
      title: string;
    };
    children?: React.ReactNode;
  }

  export class CommentCount extends React.Component<CommentCountProps> {}
}

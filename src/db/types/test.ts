export type TestName = 'pos-neg';

export type PosNegAnswer = {
  __typename: 'post-neg';
  answer: {
    positive: number;
    negative: number;
    posNegRatio: number;
  };
};

export type TestAnswer = PosNegAnswer;

// Stub for drizzle-orm module in browser environment
// すべてのdrizzle-orm関数をスタブとして提供

// drizzle-orm/mysql2 用の drizzle 関数
export const drizzle = () => ({
  select: () => ({
    from: () => ({
      where: () => ({
        limit: () => Promise.resolve([]),
      }),
    }),
  }),
  insert: () => ({
    values: () => Promise.resolve(),
  }),
  update: () => ({
    set: () => ({
      where: () => Promise.resolve(),
    }),
  }),
  delete: () => ({
    where: () => Promise.resolve(),
  }),
});

export const eq = () => {};
export const and = () => {};
export const or = () => {};
export const desc = () => {};
export const asc = () => {};
export const isNotNull = () => {};
export const sql = () => {};
export const between = () => {};
export const unionAll = () => {};
export const gt = () => {};
export const gte = () => {};
export const lt = () => {};
export const lte = () => {};
export const ne = () => {};
export const inArray = () => {};
export const notInArray = () => {};
export const like = () => {};
export const notLike = () => {};
export const union = () => {};
export const isNull = () => {};
export const exists = () => {};
export const notExists = () => {};
export const count = () => {};
export const sum = () => {};
export const avg = () => {};
export const min = () => {};
export const max = () => {};

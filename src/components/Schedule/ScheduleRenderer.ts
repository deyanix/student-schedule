import _ from "lodash";

abstract class Area {
  abstract get start(): number;
  abstract get end(): number;

  isOverlap(o: Area): boolean {
    return (
      (this.start >= o.start && this.start < o.end) ||
      (this.end > o.start && this.end < o.end)
    );
  }
}

export class ClassContainer extends Area {
  public readonly _classes: Area[];

  constructor(classes: Area[]) {
    super();
    this._classes = classes;
  }

  get start(): number {
    return _.minBy(this._classes, (c) => c.start)?.start ?? 0;
  }

  get end(): number {
    return _.maxBy(this._classes, (c) => c.end)?.end ?? 0;
  }
}

export class Class extends Area {
  public readonly _id: number;
  public readonly _start: number;
  public readonly _end: number;

  constructor(id: number, start: number, end: number) {
    super();
    this._id = id;
    this._start = start;
    this._end = end;
  }

  get start(): number {
    return this._start;
  }

  get end(): number {
    return this._end;
  }

  toString(): string {
    return this._id.toString();
  }
}

export const data1: Class[] = [
  new Class(1, 1, 3),
  new Class(2, 1, 2),
  new Class(3, 2, 5),
  new Class(4, 2, 4),
  new Class(5, 3, 6),
  new Class(6, 4, 7),
  new Class(7, 4, 6),
  new Class(8, 6, 8),
  new Class(9, 6, 8),
  new Class(10, 9, 10),
];

export const data2: Class[] = [
  new Class(1, 1, 3),
  new Class(2, 1, 2),
  new Class(3, 2, 5),
  new Class(4, 2, 4),
  new Class(5, 3, 6),
  new Class(6, 4, 7),
  new Class(7, 4, 6),
  new Class(8, 6, 8),
  new Class(9, 6, 9),
  new Class(10, 8, 10),
  new Class(11, 8, 10),
  new Class(12, 9, 12),
  new Class(13, 9, 11),
];

export const data3: Class[] = [
  new Class(1, 1, 2),
  new Class(2, 1, 3),
  new Class(3, 2, 4),
  new Class(4, 3, 5),
  new Class(5, 3, 6),
  new Class(6, 3, 7),
  new Class(7, 4, 7),
  new Class(8, 5, 7),
  new Class(9, 6, 8),
  new Class(10, 7, 10),
];

export const data = data2;

export interface ClassRelation {
  above?: Class;
  below: Class;
}

export interface ClassColumn {
  base: Class[];
  content: Class[];
}

export interface ClassLocation {
  class: Class;
  weight: number;
  parent: Class[];
  offset: number;
  neighbours: Class[];
  child: Class[];
}

export function render() {
  const classes = _.sortBy(data, "start");
  const relations: ClassRelation[] = [];
  const columns: ClassColumn[] = [];
  const locations: ClassLocation[] = [];

  function leafs(root: Class | undefined): Class[] {
    const c = [];
    const r = [...relations.filter((r) => r.above === root)];
    let current: ClassRelation | undefined = undefined;
    while ((current = r.pop()) !== undefined) {
      const currentRelations = relations.filter(
        (item) => item.above === current?.below
      );
      r.push(...currentRelations);
      c.push(current.below);
    }
    return _.uniq(c);
  }

  classes.forEach((currentClass) => {
    let currentClasses = classes
      .map((c) => ({
        class: c,
        distance: Math.abs(c.end - currentClass.start),
        leafs: leafs(c),
      }))
      .filter(
        (item) =>
          !currentClass.isOverlap(item.class) &&
          !item.leafs.some((c1) => currentClass.start >= c1.end) &&
          currentClass.start >= item.class.end
      );

    const minDistance =
      _.minBy(currentClasses, (c) => c.distance)?.distance ?? 0;
    let optimizedClasses = currentClasses.filter(
      (item) =>
        !item.leafs.some((c1) => currentClass.start > c1.start) ||
        item.distance === minDistance
    );
    if (optimizedClasses.length !== 0) {
      currentClasses = optimizedClasses;
    }

    _(currentClasses)
      ?.map((c) => c.class)
      .forEach((c) => relations.push({ above: c, below: currentClass }));
  });

  // relations
  //   .map((i) => `${i.above} -> ${i.below}`)
  //   .forEach((i) => console.log(i));

  const rootClasses = classes.filter(
    (c) => !relations.find((r) => r.below === c)
  );
  columns.push({
    base: [],
    content: rootClasses,
  });

  const childClasses = _(classes)
    .filter((c) => !rootClasses.includes(c))
    .map((c) => ({
      class: c,
      root: relations.filter((r) => r.below === c).map((r) => r.above),
    }))
    .value();
  columns.push(
    ..._(childClasses)
      .map((c) => c.root)
      .uniqWith(_.isEqual)
      .map((r) => ({
        base: r as Class[],
        content: childClasses
          .filter((c) => _.isEqual(c.root, r))
          .map((c) => c.class),
      }))
      .value()
  );

  locations.push(
    ...columns[0].content.map((c, index) => ({
      class: c,
      weight: 1,
      parent: [],
      child: [],
      offset: index,
      neighbours: [],
    }))
  );

  function enlargeColumn(
    locs: ClassLocation[],
    additionalWeight: number
  ): void {
    for (let w = additionalWeight; w > 0; w--) {
      const currentLocation = _.chain(locs)
        .sortBy((loc) => loc.weight)
        .first()
        .value();
      currentLocation.weight++;
      if (currentLocation.parent.length === 0) {
        continue;
      }
      enlargeColumn(
        locations.filter((loc) => currentLocation.parent.includes(loc.class)),
        1
      );
    }
  }

  _(columns)
    .drop(1)
    .forEach((c) => {
      const baseLocations = locations.filter((l) => c.base.includes(l.class));
      const content = _.flatMap(c.content);

      const baseWeights = baseLocations.reduce(
        (previous, loc) => loc.weight + previous,
        0
      );
      if (baseWeights > content.length) {
        console.log("big", content.map((cc) => cc._id).join(", "), baseWeights);
      } else if (baseWeights < content.length) {
        enlargeColumn(baseLocations, content.length - baseWeights);
      }

      baseLocations.forEach((loc) =>
        _.chain(loc.child)
          .push(...content)
          .uniq()
          .commit()
      );
      locations.push(
        ...content.map((cont, index) => ({
          class: cont,
          weight: 1,
          parent: baseLocations.map((l) => l.class),
          child: [],
          offset:
            baseLocations.reduce(
              (previous, loc) => Math.min(previous, loc.offset),
              Number.MAX_VALUE
            ) + index,
          neighbours: [],
        }))
      );
    });
  console.log(locations);
}

// const product1 = _.chain(_.times(10))
//   .map((t) => t + 1)
//   .map((t) => [
//     t,
//     _.chain(data)
//       .filter((i) => i.start <= t && i.end > t)
//       .map((i) => i._id)
//       .value(),
//   ])
//   .fromPairs()
//   .value();
// console.log(product1);
//
// const product2 = _.chain(data)
//   .map((i1) => [
//     i1._id,
//     _.chain(data)
//       .filter((i2) => i2 !== i1)
//       .omitBy(
//         (i2) =>
//           (i1.start >= i2.start && i1.start < i2.end) ||
//           (i1.end > i2.start && i1.end < i2.end)
//       )
//       .map((i2) => i2._id)
//       .value(),
//   ])
//   .fromPairs()
//   .value();
// console.log(product2);
//
// const product3 = _.chain(data)
//   .map((i1) => [
//     i1._id,
//     _.chain(data)
//       .filter((i2) => i2 !== i1)
//       .filter(
//         (i2) =>
//           (i1.start >= i2.start && i1.start < i2.end) ||
//           (i1.end > i2.start && i1.end < i2.end)
//       )
//       .map((i2) => i2._id)
//       .value(),
//   ])
//   .fromPairs()
//   .value();
// console.log(product3);

// const product = _.chain(data)
//   .flatMap((i1) =>
//     _.chain(data)
//       .filter(
//         (i2) =>
//           i2 !== i1 &&
//           ((i1.start >= i2.start && i1.start < i2.end) ||
//             (i1.end > i2.start && i1.end < i2.end))
//       )
//       .map((i2) => [i1._id, i2._id].sort())
//       .value()
//   )
//   .uniqWith(_.isEqual)
//   .sortBy(0)
//   .value();

import type { AggregateRoot } from '@nestjs/cqrs';

type FieldKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];

type FieldsOnly<T> = {
    [K in FieldKeys<T>]: T[K] extends object ? ToDto<T[K]> : T[K]
};

// utility type to omit functions and AggregateRoot's fields
export type ToDto<T> = Omit<FieldsOnly<T>, keyof AggregateRoot>
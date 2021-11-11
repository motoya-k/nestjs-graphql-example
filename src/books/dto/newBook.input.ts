import { Field, Int, InputType } from '@nestjs/graphql';
import { MaxLength, Min, Max } from 'class-validator';

@InputType()
export class NewBookInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field((type) => Int)
  @Min(0)
  @Max(9999)
  price: number;

  @Field((type) => [String])
  author: string;
}

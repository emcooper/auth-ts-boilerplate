import { MinLength, MaxLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateTodoInput {
    @Field()
    @MinLength(1)
    @MaxLength(100)
    name!: string;
}


@InputType()
export class UpdateTodoInput {
    @Field(() => ID)
    id!: string

    @Field({ nullable: true })
    @MinLength(1)
    @MaxLength(100)
    name?: string;

    @Field({ nullable: true })
    isComplete?: Boolean;
}

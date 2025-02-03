import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

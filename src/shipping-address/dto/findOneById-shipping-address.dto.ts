import { IsMongoId, IsNotEmpty } from "class-validator";

export class FindOneByIdShippingAddressDto{
    @IsMongoId()
    @IsNotEmpty()
    id: string
}
import { IsMongoId, IsNotEmpty } from "class-validator";

class FindOneByIdShippingAddressDto{
    @IsMongoId()
    @IsNotEmpty()
    id: string
}
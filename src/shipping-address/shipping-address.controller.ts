import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { PaginationshippingAddress } from './dto/pagination-shipping-address.dto';
import { FindShippingAddressParamsDto } from './dto/find-shipping-address.dto';
import { FindOneByIdDto } from './dto/findOneById-shipping-address.dto';


@Controller()
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @MessagePattern('shipping-adddress.create')
 async create(@Payload()createShippingAddressDto: CreateShippingAddressDto) {

    const result = await this.shippingAddressService.createAddress(createShippingAddressDto);
    return result;
  }

  @MessagePattern('shipping-address.find_all')
 async findAllForAdmin(@Payload()pagination:PaginationshippingAddress) {
    const {limit, page} = pagination
  
    const result = await this.shippingAddressService.findAll(limit,page)
    return result;
  }




  @MessagePattern('shipping-address.find_one')
  async findOne(@Payload() payload:FindOneByIdDto) {
    const { id } = payload;
    const result = this.shippingAddressService.findOneById(id);
    return result;
  }

  @MessagePattern('shipping-address.update')
 async update(@Payload() payload: {id: FindOneByIdDto, data: UpdateShippingAddressDto}) {
  const {id, data} = payload 
   const result= await this.shippingAddressService.update(id.id, data)
   return result
  }

  @MessagePattern('shipping-address.delete')
  async remove(@Payload() param: FindOneByIdDto) {
    const { id } = param;
    const result = await this.shippingAddressService.remove(id);
    return result;
  }
}

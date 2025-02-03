import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { PrismaService } from 'src/prisma.service';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class ShippingAddressService {
  constructor(private readonly prisma: PrismaService) {}

  
  async createAddress(createShippingAddressDto: CreateShippingAddressDto) {

  
    const createAddres = await this.prisma.shipping_addresses.create({
      data: {
       ...createShippingAddressDto,
        
      }
    });
    return createAddres;
  }

  async findAll(limit:number ,page:number) {
    const skip = (page - 1) * limit;
   
    const addresses = await this.prisma.shipping_addresses.findMany({take:limit,skip:skip,where:{is_available:true}})
    if (!addresses || addresses.length === 0) {
      throw new RpcException({
        message: 'No hay direccion de Envio',
        statusCode: HttpStatus.OK,
        microservice: 'Shipping-address',
      });
    }

    return addresses
  }




 async findOneById(id: string) {
    const findAddress = await this.prisma.shipping_addresses.findUnique({where:{id}})
    if (!findAddress) {
      throw new RpcException({
        message: 'No existe la direccion de envio',
        statusCode: HttpStatus.NOT_FOUND,
        microservice: 'Shipping-address',
      });
    }

    return findAddress
  }

 async update(id:string, data:UpdateShippingAddressDto) {
  
   await this.findOneById(id)
   const updateAddress = await this.prisma.shipping_addresses.update({
    where:{id:id},
    data:data})

   return {message: 'Direccion de envio actualizada', data:updateAddress}
  }

  async remove(id:string) {
   await this.findOneById(id)
   const deleteAddress = await this.prisma.shipping_addresses.update({where:{id:id},data:{is_available:false}})
   
   return {message: 'Direccion de envio eliminada', data:deleteAddress}
  }
}

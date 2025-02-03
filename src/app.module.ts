import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:[".env.development",".env.production"]
  }), ShippingAddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

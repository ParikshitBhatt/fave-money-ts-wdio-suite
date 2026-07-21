import { SimOptionsResponse } from "../types/response.type";

export class SimUtils {
    async getSimOption() {
        let response = await driver.execute("browserstack_executor: {\"action\": \"deviceInfo\", \"arguments\" : {\"deviceProperties\" : [\"simOptions\"]}}") as SimOptionsResponse;
        return response;
    }

    async getOTPFromNotification() {
        await driver.pause(5000);
        let smsList = await driver.execute("mobile: listSms");
        const latestSms = smsList['items'];
        if (smsList.total === 0 ) {
            await driver.pause(5000);
            smsList = await driver.execute("mobile: listSms");
        }
        const otp =latestSms[0].body.match(/\d{6}/)?.[0];
        return otp as string;
    }
}
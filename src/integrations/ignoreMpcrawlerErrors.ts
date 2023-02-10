import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { Event, Integration } from "@sentry/types";

import { appName, sdk } from "../crossPlatform";

/**
 * IgnoreMpcrawlerErrors
 *
 * https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html
 */
export class IgnoreMpcrawlerErrors implements Integration {
  /**
   * @inheritDoc
   */
  public name: string = IgnoreMpcrawlerErrors.id;

  /**
   * @inheritDoc
   */
  public static id: string = "IgnoreMpcrawlerErrors";

  /**
   * @inheritDoc
   */
  public setupOnce(): void {
    addGlobalEventProcessor((event: Event) => {
      if (
        getCurrentHub().getIntegration(IgnoreMpcrawlerErrors) &&
        appName === "wechat" &&
        sdk.getLaunchOptionsSync
      ) {
        const options = sdk.getLaunchOptionsSync();

        // 微信小程序 1129 爬虫访问
        if (options.scene === 1129) {
          return null;
        }
      }

      return event;
    });
  }
}

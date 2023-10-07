import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeEach(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
       ignoreDefaultArgs: ['--disable-extensions'],
      // headless: false, // show gui
      headless: 'old',
      slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
    server.kill();
  });

 it("should validate a valid credit card number", async () => {
    const cardNumber = "4111111111111111"; // Введите здесь корректный номер карты
    await page.waitForSelector("#cardNumber");
    await page.type("#cardNumber", cardNumber);
    await page.click(".submit");
    await page.waitFor(1000); // Подождите, чтобы видеть результат (можно изменить время ожидания)
    const statusText = await page.evaluate(() => {
      return document.querySelector(".status").textContent;
    });
    expect(statusText).toBe("");
  });
});

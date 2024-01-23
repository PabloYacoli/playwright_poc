const { test, expect } = require('@playwright/test');
const exp = require('constants');
import {LoginPage} from '../pages/login';


test('TC01_verifyRegistrationFromCheckoutPage', async ({ page }) => {
  const Login = new LoginPage(page);
  Login.goToCheckoutRegistrationPage();
  expect(page.getByText('Account Login').isVisible());
  await Login.create_new_account_btn.click();
  expect(page.locator('span').filter({ hasText: /^Create Account$/ }).isVisible());
  await Login.first_name_tbox.fill('Lisa');
  await Login.last_name_tbox.fill('Simpson');
  await Login.new_user_email_tbox.fill('thisisanemail3@yopmail.com');
  await Login.confirm_email_tbox.fill('thisisanemail3@yopmail.com');
  await Login.password_tbox.fill('thisPassword@testing');
  await Login.confirm_password_tbox.fill('thisPassword@testing');
  expect(page.getByRole('button', { name: 'Create Account' }).isEnabled());

});

test('TC02_verifyLoginFromCheckoutPage', async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.goToCheckoutLoginPage();
  expect(Login.login_btn.isDisabled());
  await Login.user_email_tbox.fill('billfieldtest@gmail.com');
  await Login.password_tbox.fill('testing@123');
  await Login.login_btn.click();
  // await page.pause()
});

test('TC03_verifyLoginFromLoginPage', async ({ page }) => {
  test.setTimeout(120000);
  const Login = new LoginPage(page);
  await Login.goToCheckoutRegistrationPage();
  expect( page.getByRole('button',{name: 'Log In'}).isDisabled());
  await Login.user_email_tbox.fill('billfieldtest@gmail.com');
  await Login.password_tbox.fill('testing@123');
  await Login.login_btn.click();
  await Login.edit_btn.click();
  expect( page.getByRole('button',{name: 'Log In'}).isVisible());
  //await page.pause()

});

test('TC04_verifyRegistrationFieldValidationOnCheckout', async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.goToCheckoutRegistrationPage();
  expect(page.getByText('Account Login').isVisible());
  await Login.create_new_account_btn.click();
  expect(page.locator('span').filter({ hasText: /^Create Account$/ }).isVisible());
  await Login.first_name_tbox.fill('');
  await Login.last_name_tbox.fill('');
  await Login.new_user_email_tbox.fill('');
  await Login.confirm_email_tbox.fill('');
  await Login.password_tbox.fill('');
  await Login.confirm_password_tbox.fill('');
  expect(page.getByText('First Name is required.'))
  expect(page.getByText('Last Name is required.'))
  expect(page.getByText('Email is required.', { exact: true }))
  expect(page.getByText('Confirmed email is required.'))
  expect(page.getByText('Password is required.'))
  expect(page.getByText('Confirmed password is'))
  expect(page.getByRole('button', { name: 'Create Account' }).isDisabled());
  // await page.pause();
});


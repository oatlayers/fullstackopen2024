const { test, expect, beforeEach, describe, screen } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'oatlayers6',
        username: 'oatlayers6',
        password: '123456789'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'oatlayers6', '123456789')
        await expect(page.getByText('oatlayers6 logged in')).toBeVisible()
      })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'oatlayers6', 'wrong')
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText('oatlayers6 logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'oatlayers6', '123456789')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test blog by playwright', 'oatlayers6', 'oatlayers.com', true)
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByTestId('blog-title')).toBeVisible()
            await expect(page.getByTestId('blog-author')).toBeVisible()
            await expect(page.getByRole('link', { name: 'oatlayers.com' })).toBeVisible()
        })

        test('blog can be edited', async ({ page }) => {
          await createBlog(page, 'test blog edit like by playwright', 'oatlayers6', 'oatlayers.com', true)
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByText('0')).toBeVisible()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('1')).toBeVisible()
        })

        test('user who added the blog can delete the blog', async ({ page }) => {
          await createBlog(page, 'test delete by playwright', 'oatlayers6', 'oatlayers.com', true)
          await page.reload()
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByTestId('blog-title')).toBeVisible()
          await expect(page.getByTestId('blog-author')).toBeVisible()
          await expect(page.getByRole('link', { name: 'oatlayers.com' })).toBeVisible()

          await page.getByRole('button', { name: 'remove' }).click()
          page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual('Remove blog test delete by playwright by oatlayers6?')
            await dialog.accept()
          })
          await expect(page.getByTestId('blog-title')).not.toBeVisible()
        })

      })
  })

  test('blogs are arranged in the order according to the likes', async ({ page }) => {
    await loginWith(page, 'oatlayers6', '123456789')
    await createBlog(page, 'test blog order one', 'oatlayers6', 'oatlayers.com', true)
    await createBlog(page, 'test blog order two', 'oatlayers6', 'oatlayers.com', true)
    await createBlog(page, 'test blog order three', 'oatlayers6', 'oatlayers.com', true)

    await page.locator('div').filter({ hasText: /^test blog order three oatlayers6view$/ }).locator('#view-button').click()

    await page.getByTestId('likes').nth(2).click()
    await page.reload()

    await page.getByRole('button', { name: 'view' }).first().click()
    await expect(page.getByText('1like')).toBeVisible()
  })

  test('only user who added the blog can delete the blog', async ({ page, request }) => {
    await request.post('/api/users', {
      data: {
        name: 'oatlayers5',
        username: 'oatlayers5',
        password: '12345678910'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'oatlayers6',
        username: 'oatlayers6',
        password: '123456789'
      }
    })
    await loginWith(page, 'oatlayers5', '12345678910')

    await createBlog(page, 'test only user delete by playwright', 'oatlayers5', 'oatlayers.com', true)
    await page.getByRole('button', { name: 'logout' }).click()

    await loginWith(page, 'oatlayers6', '123456789')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })
})
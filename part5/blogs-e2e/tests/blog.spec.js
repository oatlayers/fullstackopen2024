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
      })
  })
})
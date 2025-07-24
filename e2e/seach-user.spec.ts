import { test, expect } from '@playwright/test'

test('Search user flow', async ({ page }) => {
  await page.goto('/')

  const userCards = page.getByTestId('user-card')
  await page.waitForSelector('[data-testid="user-card"]')
  const initialUsersCount = await userCards.count()
  expect(initialUsersCount).toBeGreaterThan(2)

  await page.getByTestId('search-input').fill('asd123')

  const afterSearchUsersCount = await userCards.count()

  expect(initialUsersCount).toBeGreaterThan(afterSearchUsersCount)
  await expect(userCards).toBeHidden()
})

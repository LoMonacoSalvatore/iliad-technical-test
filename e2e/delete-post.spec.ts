import { test, expect } from '@playwright/test'

test('Delete post flow', async ({ page }) => {
  await page.goto('/')

  const userCards = page.getByTestId('user-card')
  await page.waitForSelector('[data-testid="user-card"]')
  const userCardsCount = await userCards.count()
  expect(userCardsCount).toBeGreaterThan(0)

  await userCards.first().click()

  await expect(page).toHaveURL(/\/user\/\d+/)

  const viewPostsBtn = page.getByTestId('view-posts-button')
  await expect(viewPostsBtn).toBeVisible()
  await viewPostsBtn.click()

  await expect(page).toHaveURL(/\/posts\/\d+/)

  const postCards = page.getByTestId('post-card')
  const initialPostCardsCount = await postCards.count()

  const deleteBtns = page.getByTestId('delete-post-button')
  await deleteBtns.first().click()

  await expect(page.getByTestId('post-card')).toHaveCount(initialPostCardsCount - 1)
})

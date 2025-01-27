import { defineNuxtRouteMiddleware, abortNavigation } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  // ゲーム画面から離れようとする時のみ確認
  if (from.name === 'game') {
    // 確認ダイアログを表示
    if (!confirm('ゲームを中断します。保存されませんがよろしいですか？')) {
      // キャンセルした場合は遷移を中止
      return abortNavigation()
    }
  }
  return true
}) 
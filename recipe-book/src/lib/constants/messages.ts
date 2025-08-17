
export const ERROR_MESSAGES = {
    FORM_GUARD: '入力内容が保存されていません。ページを離れますか？',
    REQUIRED_FIELD: '入力してください',
    REQUIRED_PARAM: '{0}パラメータが不足しています。',
    REQUIRED_ANY_PARAMS: '{0}パラメータのいずれかが必要です。',
    INVALID_JSON: 'POSTボディが不正です。JSON形式に変換できません。',
    AUTH_FAILED: 'ログインに失敗しました。ユーザーIDまたはパスワードが違います。',
    CREATE_FAILED: '{0}の作成に失敗しました。',
    UPDATE_FAILED: '{0}の更新に失敗しました。',
    DELETE_FAILED: '{0}の削除に失敗しました。',
    SEARCH_FAILED: '{0}の検索に失敗しました。',
    NOT_FOUND: '{0}が見つかりませんでした。',
    INVALID_VALUE: '{0}が無効です。',
    SERVER_ERROR: 'サーバーでエラーが発生しました。',
    UNKNOWN_ERROR: '予期せぬエラーが発生しました。',
} as const;

/**
 * メッセージテンプレート置換
 * 
 * @param template プレースホルダ付きのメッセージ
 * @param args 挿入したい文字列リスト
 * @returns プレースホルダを置換した文字列
 */
export function formatMessage(template: string, ...args: string[]): string {
    return args.reduce((result, arg, index) => {
        return result.replace(`{${index}}`, arg)
    }, template);
}


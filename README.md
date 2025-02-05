# Inventory Management App

Это приложение для управления инвентарем, разработанное с использованием `Vue.js`, `Pinia` для управления состоянием и `SCSS` для стилизации.

## Особенности

1. Инвентарная сетка:

- Отображение инвентаря в виде сетки `5x5`.
- Возможность перемещения элементов инвентаря путем перетаскивания.
- Отображение количества элементов на ячейке, если оно больше 1.

2. Модальное окно предмета (`ItemModal`):

- Анимация появления с правой стороны экрана.
- Отображение "информации" о выбранном элементе с использованием заполнения `linear-gradient`.
- Возможность удаления элемента.
- Кнопка закрытия (`CloseButton`) в правом верхнем углу.

3. Модальное окно количества (`QuantityModal`):

- Анимация появления с нижней стороны экрана.
- Запрос количества элементов для удаления.
- Подтверждение удаления с помощью кнопки `Подтвердить`.
- Отмена удаления с помощью кнопки `Отмена`.
- Закрытие модального окна по нажатию `Esc` или после удаления элемента.

4. Боковая панель (`SidebarComponent`) - Информативная боковая панель с использованием заполнения `linear-gradient`.

5. Подвал (`FooterComponent`) содержит поле поиска и кнопку закрытия.

6. Управление состоянием:

- `Pinia` для управления состоянием инвентаря, включая добавление, удаление и перемещение элементов.
- Сохранение состояния в `sessionStorage`, чтобы данные сохранялись при перезагрузке страницы.

7. Кастомный курсор:

- Cтандартный курсор браузера скрыт.
- Использование пользовательских курсоров для кнопок и состояния наведения.

## Технологии

- Vue 3
- Pinia (для управления состоянием)
- SCSS (для стилизации)
- Vite (для сборки)
- `pinia-plugin-persistedstate` (для сохранения состояния)

## Как запустить

1.  **Клонируйте репозиторий:**

```bash
git clone <YOUR_REPOSITORY_URL>
```

2. Перейдите в папку проекта:

```bash
cd <YOUR_PROJECT_DIRECTORY>
```

3. Установите зависимости:

```bash
npm install
```

4. Запустите сервер разработки:

```bash
npm run dev
```

5. Откройте приложение в браузере по адресу, указанному в консоли:

```bash
  http://localhost:5173
```

## Как использовать

1. Перемещение элементов:

- Зажмите левую кнопку мыши на элементе в сетке.
- Перетащите элемент в нужную ячейку.
- Отпустите левую кнопку мыши.

2. Просмотр информации об элементе:

- Нажмите на элемент в сетке, чтобы открыть модальное окно.

3. Удаление элементов:

- Откройте модальное окно элемента.
- Нажмите кнопку `Удалить предмет`.
- Введите количество элементов для удаления и нажмите `Enter` или кнопку `Подтвердить`.
- Или нажмите `Отмена`, чтобы закрыть модальное окно без удаления.

4. Закрытие модальных окон:

- Нажмите на кнопку `Закрыть` в правом верхнем углу модального окна.
- Или нажмите клавишу `Esc`.

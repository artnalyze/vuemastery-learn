# Optimizing your Editor

**Note: Since the release of this lesson, Vetur has updated how it handles disabling its built-in snippets. For more context, [read here](https://github.com/vuejs/vetur/issues/698).**

In this tutorial, we’ll be setting up the free Visual Studio Code  editor for an optimized development environment. While there are many  options for code editors, and you may already have a favorite one, I’ll  be using VS Code during this course. The concepts covered in this lesson may be transferable to other code editors, but if you’d like to follow  along exactly, you’ll start by making sure you have [VS Code installed](https://code.visualstudio.com/download).

## What are we going to learn?

We’re going to be learning how to:

- Get syntax highlighting in our .vue files
- Utilize code snippets for a faster workflow
- Configure our editor to auto-format our code
- And explore other helpful extensions that’ll improve our development experience

## Installing Vetur

There are several features that make VS Code a great environment for  Vue development, including Vetur, a plugin designed by Pine Wu, a core  member of the Vue.js team.

Here in VS Code, if we open up a .vue file, such as this About.vue  file, we see all of this gray code. That’s because VS Code won’t  automatically highlight the syntax in .vue files.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370313286_0.png?alt=media&token=68c7bea3-b8af-4b20-ac34-076880dd39f5)

Vetur can fix this for us, and give us other features designed to improve the developer experience.

So let’s install it now. Open the extensions store.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370313287_1.png?alt=media&token=364ffbf9-3048-4b5f-afa2-c55b187a6a6e)

Then search for “Vetur”, select it in the search results, and click **Install**. Then click **Reload**.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370321200_2.png?alt=media&token=42eed5d5-2b43-4c54-9744-a7e9d73d5bb3)

------

## Vetur’s Features

Now that Vetur is installed, let’s take a look at its features.

**Syntax Highlighting** By typing `command + P`, and typing the name of a .vue file,  we can open up the About.vue file. As you can see, now our code is  getting proper syntax highlighting. Awesome - no more gray code.

Checking the Home.vue file, we can see that our JavaScript is also being highlighted correctly.

**Snippets** Another feature Vetur comes packaged with his code snippets. These are  time-saving “snippets” of code that allow you to quickly create commonly used chunks of code.

Let’s create a new component to see this in action. We’ll name is  EventCard.vue. Now, if we type the word “vue” into a .vue file and hit  ENTER, this will auto-fill that file with the skeleton, or scaffold, of a single file .vue component.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370321201_3.png?alt=media&token=879d1a61-5f3b-4f42-b555-1c3635397096)

**Emmet** Vetur also comes packaged with Emmet. This is a popular tool that allows you to use shortcuts to build out your code.

For example, we can type `h1` and hit enter, and this will create an opening and closing h1 element.

When we type something more complex, such as  `div>ul>li`, it will produce:

```html
    <div>
        <ul>
            <li></li>
        </ul>
    </div>
```

If Emmet doesn’t appear to be working for you, you can add this to your User Settings:

```json
    "emmet.includeLanguages": {
          "vue": "html"
      },
```

To learn more about how Emmet can speed up your development, [go here](https://emmet.io/).

------

## Installing ESLint & Prettier

Now, we need to make sure we have ESLint and Prettier installed. In  the extensions store, we’ll do a search for ESLint, then go ahead and  install it. And we’ll do the same for Prettier. Once it’s installed,  we’ll hit reload to reload VS Code.

## Configuring ESLint

Now that these are installed, we need to add a bit of extra configuration to them.

When we created our project from the terminal, we chose to create it  with dedicated config files, which gave us this .eslintrc.js file, where we can configure ESLint for this project. Had we not chosen dedicated  files, we would find the ESLint configurations within our package.json.

So, in our .eslintrc.js file, we’ll add:

```
'plugin:prettier/recommended'
```

This will enable Prettier support in ESLint with the default settings.

So our file now looks like this:

```javascript
    module.exports = {
      root: true,
      env: {
        node: true
      },
      'extends': [
        'plugin:vue/essential',
        'plugin:prettier/recommended', // we added this line
        '@vue/prettier'
      ],
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      },
      parserOptions: {
        parser: 'babel-eslint'
      }
    }
```

## Configuring Prettier

We also have the option to create a Prettier configuration file, to  add some special settings according to our personal style or our team’s  preferences.

We’ll create it here and name it `.prettierrc.js`.

And inside, we’ll type:

```javascript
    module.exports = {
        singleQuote: true,
        semi: false
    }
```

This will convert double quotes to single quotes, and make sure that semicolons are not automatically inserted.

------

## User Settings

In order to further optimize VS Code for a great development  experience, we’ll add some configurations to our User Settings. To  access User Settings, click on **Code** in the top navigational bar, then **Preferences**, then **Settings**. This will bring up a **User Settings** window where you can add settings in json.

First, we want to add:

```json
    "vetur.validation.template": false
```

This will turn off Vetur’s linting feature. We’ll be relying instead on ESLint + Prettier.

Now we want to tell ESLint what languages we want it to validate (vue, html, and javascript) and set `autoFix` to `true` on each:

```json
    "eslint.validate": [
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        }
    ],
```

Then for good measure, we’ll tell ESLint to autoFixOnSave.

```json
    "eslint.autoFixOnSave": true,
```

And tell our editor itself to formatOnSave.

```json
    "editor.formatOnSave": true,
```

------

## Testing it out

To test that this is working, we’ll add a data property to our  EventCard component here, and add a quote: “I want to be single” then  we’ll throw in a semicolon here, too. When we hit save, our quotes are  converted into single quotes and the semicolon is removed. Awesome -  it’s working.

------

## Additional Tools

Now let’s take a look at some additional tools that can help speed up your development.

**Copy Relative Path** Copy Relative Path is an extension that allows you to copy the location a file lives, based on its relation to the directory to which it is  linking.

Let’s search for it, install it, then see it in action.

In our Home.vue file, we see there’s a relative path here already, where we’re importing the HelloWorld component.

In order to get the relative path of a file we want to import, we’d right click on the file, then select **Copy Relative Path.** Now, when we paste what was copied, we see we have the accurate  relative path. Notice this src. The comment here lets us know that  because of the way our project is set up, we can use  `@` instead.

**Integrated Terminal** A convenient built-in feature of the VS Code editor is its integrated  terminal, which you can use instead of switching over to your separate  terminal. You can open it, with the keyboard shortcut:  `ctrl + ``

**More Snippets** If you’re interested in installing some additional convenient code snippets, you can download a full suite of [Vue](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) [VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets), created by Core Vue Team Member Sarah Drasner.

Let’s search for the extension with her name, sarah.drasner. There they are. Now we can install and reload.

Let’s take a look at them in action.

If we type `vif` on an element in our template, that’ll give us a v-if statement, and typing `von` will give us a full event handler. Instead of manually typing out a data property, we can simply type `vdata` which will create one for us. We can do the same thing to add props with `vprops`. We can even use it to create the code to quickly import a libary, with `vimport-lib`. As you can see, these are very helpful and time-saving snippets.

Please note that if you’re using this Snippets extension, it is recommended to add a line to your User Settings:

```
vetur.completion.useScaffoldSnippets` should be `false
```

This will make sure these snippets aren’t conflicting with Vetur’s.

**Color Themes** Finally, if you’re wondering how to change your theme in VS Code, or if  you’re wondering which one I’m using here, you can go to **Code** > **Preferences** > **Color Theme**.

As you can see, I’m using **FlatUI Dark**. You can change your theme color to any of these options here, or you can search for other themes in the extensions store.

If you don’t see one you want, you can also head to the Visual Studio Marketplace online. Here, you can preview tons of different plugins and themes, such as Night Owl by our friend Sarah Drasner. You can install  it directly from the browser then find it in your **Color Theme Preferences**.

------

## What’s next

Thanks for watching! In the next lesson, we’ll be learning all about the anatomy of single file components. See you there.

----

### Lesson Resources

- [Install VS Code](https://code.visualstudio.com/download)
- [Emmet Docs](https://emmet.io/)
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

---


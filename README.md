# TicTac Learn – Assignment Project

This project was created as part of a frontend developer assignment for TicTac.  
It follows all required and optional tasks outlined in the assignment, with a few extra touches — such as a **dark mode**, inspired by our conversation with Dave about enabling theme switching in apps 😁

The `/products` route uses **custom components** with reusable logic, while the `/products/[slug]` pages demonstrate a different approach, utilizing **Vuetify** components to showcase flexibility.

---

## 🚀 Running the Project

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Or build and run the local preview

```bash
npm run build-only
```

```bash
npm run preview
```

You can also see the project [hosted on Vercel](https://tictac-learn-assignment.vercel.app/).

## 📋 Assumptions

- I chose to enable filtering by title after reviewing the API structure.
- Filters are applied on button click (rather than live as the user types), assuming a typical online shop behaviour where userss finalize their filters before applying.
- Since debounce was listed as nice-to-have, I've added it to the searchbar, even though it would fit an on-type approach better.
- In a production app, i would assssume that we want more complex caching (for example - using TanStack Query). In this project I didn't implement any caching beyond default browser behaviour, as it was not stated in the requirements.
- I assumed that infinite scroll would be acceptable given the small number of products. In a real-world application with more data, pagination would likely be a better choice.
- Filters are stored in the Pinia store. In a production app, it would also be recommended to reflect them in URL query parameters to allow sharing or bookmarking filtered results.
- I made some basic efforts to showcase accessibility features (aria, keyboard controls for carousel).
- I used simple git commit messsages and worked mainly on main branch, but when working in a team it would be a nice idea to add some basic messsage structure (like feat/, fix/, chore/) and feature/env branches.
- Data handling and egde case checks were implemented using what I found in the FakeStore database, I assume we get the description/price etc with every item.

## 🎨 Design Approach

- I drew inspiration from Airbnb's design language, focusing on subtle shadows, generous white space, and a clean, modern aesthetic.
- Since Vuetify is primarily based on Material Design, its visual style differs slightly. If the project were to be expanded, it would be a good idea to customize Vuetify's theme and default variables to better align with the overall design direction.
- I adapted the UI to an e-commerce style layout, making sure that the product pressentation feels natural. I also adjusted the design to a limited amount of data that we want to showcase to the user (with more data, we could increase the density and change approach to the visual hierarchy).
- I've added some placeholder functionalities (like rating or cart) to make the layout feel fuller and more complete.
- With custom components, I made sure to use Vuetify-friendly approach to styling and general structure. This makes the dark theme work out of the box.
- I used default color scheme of Vuetify with a primary color defined in the theme, it could use further adjustments if needed to suit the brand image better.
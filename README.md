# FinalYearProduct
A vulnerable web application aimed at students 

Challenge 1 - SQL

<details>
<summary>Click here to reveal the solution!</summary>

username, email and pass as ' OR '1'='1
provides unathourised admin access.
<details>

Challenge 2 - Insecure Direct Object Reference

<details>
<summary>Click here to reveal the solution!</summary>

The edit page for products is not admin protected! If the user manually enters the url products/edit/ID, it will bring them directly to the hidden edit page, allowing them to make unathourised changes!
<details>

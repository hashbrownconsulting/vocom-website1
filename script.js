/* Basic Resets */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #222;
}
header.hero {
  background: #0A1A2F;
  color: #fff;
  padding: 50px 20px;
  text-align: center;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
}
.nav-links a {
  color: white;
  text-decoration: none;
}
.btn.primary {
  background: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.section {
  padding: 60px 20px;
  text-align: center;
}
.dark {
  background: #f4f4f4;
}
.cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  width: 250px;
}
.footer {
  background: #222;
  color: #fff;
  padding: 15px 0;
}
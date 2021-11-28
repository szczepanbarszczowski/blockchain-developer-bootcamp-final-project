###Inheritance and Interfaces (Importing and extending contracts and/or using contract interfaces) Inheritances and Interfaces — (note: this is already a requirement in the final project, so you can simply describe which library or interface you use)

I used SafeMath library to make sure mathematical operations on uint type numbers are safe.

I used ERC20 interface to represent BZK tokens in a DEX contract

###Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control) Access Control Design Patterns

I used inheritance from Ownable contract and restricted dex initialization for only onwer.

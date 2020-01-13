class Refrigerator:

    def __init__(self):
        self.items= {}
        self.shelves = [[0]*3,[0]*3,[0]*3]
        self.available_shelves()

    def add_items(self, item, quantity):
        if item in self.items:
            self.items[item] += quantity
        else:
            self.items[item] = quantity
        if item not in self.shelves:
            self.update_shelves()

    def search_items(self):
        items_to_add=[]
        for item in self.items:
                if item not in self.shelves and self.items[item] > 0:
                    items_to_add.append(item)
        return items_to_add

    def find_spot(self):
        indices=[]
        for i in range(3):
            for j in range(3):
                if self.shelves[i][j] == 'available':
                    indices.append((i,j))
        return indices

    def update_shelves(self):
        if self.items == {}:
            return
        else:
            for i in range(3):
                for j in range(3):
                    if self.shelves[i][j] in self.items and self.items[self.shelves[i][j]] <= 0:
                        self.shelves[i][j] = 'available'

            new_items = self.search_items()
            index = self.find_spot()
            if index != [] :
                    for indice in index:
                        row, column = indice[0],indice[1]
                        if len(new_items) != 0:
                            self.shelves[row][column] = new_items.pop()
                        else:
                            break

    def get_item(self,item):
        if self.items[item] > 0:
            self.items[item]-=1
            if self.items[item] <= 0:
                self.update_shelves()
            return item
        else:
            print('Insufficient stock for item retrieval')

    def available_shelves(self):
        for i in range(3):
            for j in range(3):
                if self.shelves[i][j] == 0:
                    self.shelves[i][j] = 'available'

    def display_shelves(self):
        print(self.shelves)

# tests for class functions and instantiation
# fridge = Refrigerator()
# fridge.add_items('salami',1)
# fridge.display_shelves()
# print(fridge.get_item('salami'))
# fridge.display_shelves()

fridge = Refrigerator()

def retrieve():
    if fridge.items == {}:
        print('The fridge is empty, cannot retrieve.')
    else:
        print("what item would you like to get?")
        item = input()
        fridge.get_item(item)
        print('%s successfully retrieved' %item)

def add():
    print("what item do you want to add?")
    item = input()
    print("how many? Enter a number")
    quantity = input()
    while str(type(int(quantity))) != "<class 'int'>":
        print("That's not an integer, please enter an integer using number keys")
        quantity = input()
    else:
        fridge.add_items(str(item), int(quantity))
        print('added %s successfully' %item)
def _menu():
    print(help_menu)

help_menu = {'Q': "Quits the app",
'H': "brings up this command men, duh",
'D': "displays the contents of the refrigerator",
'G': "retrieves an item from the refrigerator",
 'A': "adds an item to the fridge" }

command_menu = {'H': _menu,
                'D': fridge.display_shelves,
                'G': retrieve,
                'A': add }

def __main__():
    print ("Welcome to this text based...refrigerator. Yeah, that's it so far. Just kinda bored. Hit 'H' for a list of commands")
    user = None
    while user != ('Q' or 'q'):
        user = input()
        if user == ('Q' or 'q'):
            print('alright, cya')
            break
        else:
            command_menu[user]() # this routes the return of the dictionary to a corresponding function.
__main__()

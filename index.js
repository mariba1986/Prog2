
const express = require('express');
const config = require('./config');
const database = require('./database');
const commentsRoutes = require('./api/routes/commentsRoutes');


const app = express();
const { port } = config || 3000;

const logger = (req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
};

// Comments routes
app.use = (commentsRoutes);
// Middleware for creating req.body in express app
//app.use(express.json());
//Logger, salvestab timestampi millal mida päriti
//app.use(logger);


/**
 * Categories related functions
 */

// Find category by id. Returns category if found or false.
const findCategoryById = (id) => {
    const category = database.categories.find((element) => element.id === id);
    if (category) {
        return category;
    }
    return false;
};

/**
 * Users related functions
 */

// Find user by id. Returns user if found or false.
const findUserById = (id) => {
    const user = database.users.find((element) => element.id === id);
    if (user) {
        return user;
    }
    return false;
};

/**
 * Users related functions
 */

// Find excuse by id. Returns excuse if found or false.
const findExcuseById = (id) => {
    const excuse = database.excuses.find((element) => element.id === id);
    if (excuse) {
        return excuse;
    }
    return false;
};

// Returns excuses with creator
const getExcusesWithCreator = (excuses) => {
    const excusesWithCreator = excuses.map((excuse) => {
        const createdBy = database.users.find((user) => user.id === excuse.createdById);
        return {
            ...excuse,
            createdBy,
        };
    });
    return excusesWithCreator;
};

// Returns excuses with comments
const getExcusesWithComments = (excuses) => {
    const excusesWithComments = excuses.map((excuse) => {
        const comments = database.comments.filter((comment) => comment.excuseId === excuse.id);
        return {
            ...excuse,
            comments,
        };
    });
    return excusesWithComments;
};

// Returns excuses with category
const getExcusesWithCategory = (excuses) => {
    const excusesWithCategory = excuses.map((excuse) => {
        const category = findCategoryById(excuse.categoryId);
        return {
            ...excuse,
            category,
        };
    });
    return excusesWithCategory;
};


/**
 * Users API endpoints
 */

/**
 * Get all users
 * GET - /users
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of users
 */
app.get('/users', (req, res) => {
    res.status(200).json({
        users: database.users,
    });
});

/**
 * Get user by user id
 * GET - /users/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and user with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = findUserById(id);
    if (user) {
        res.status(200).json({
            user,
        });
    } else {
        res.status(400).json({
            error: `No user found with id: ${id}`,
        });
    }
});

/**
 * Create new user
 * POST - /users
 * Required values: firstName, lastName
 * Optional values: none
 * Success: status 201 - Created and id of created user
 * Error: status 400 - Bad Request and error message
 */
app.post('/users', (req, res) => {
    const { firstName, lastName } = req.body;
    if (firstName && lastName) {
        const user = {
            id: database.users.length + 1,
            firstName,
            lastName,
        };
        database.users.push(user);
        res.status(201).json({
            id: user.id,
        });
    } else {
        res.status(400).json({
            error: 'Firstname or lastname is missing',
        });
    }
});

/**
 * Delete user
 * DELETE - /users/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // Check if user exists
    const user = findUserById(id);
    if (user) {
        // Find category index
        const index = database.users.findIndex((element) => element.id === id);
        // Remove user from 'database'
        database.users.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(400).json({
            error: `No user found with id: ${id}`,
        });
    }
});

/**
 * Update user
 * PATCH - /users/:id
 * Required values: id, firstName OR lastName
 * Optional values: firstName, lastName
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (id && (firstName || lastName)) {
        const user = findUserById(id);
        if (user) {
            const index = database.users.findIndex((element) => element.id === id);
            if (firstName) {
                database.users[index].firstName = firstName;
            }
            if (lastName) {
                database.users[index].lastName = lastName;
            }
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(400).json({
                error: `No user found with id: ${id}`,
            });
        }
    } else {
        res.status(400).json({
            error: 'Id, firstName or lastName is missing',
        });
    }
});

/**
 * Categories API endpoints
 */

/**
 * Get all categories
 * GET - /categories
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of categories
 */
app.get('/categories', (req, res) => {
    res.status(200).json({
        categories: database.categories,
    });
});

/**
 * Get category by specified id
 * GET - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and category with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const category = findCategoryById(id);
    if (category) {
        res.status(200).json({
            category,
        });
    } else {
        res.status(400).json({
            error: `No category found with id: ${id}`,
        });
    }
});

/**
 * Create new category
 * POST - /categories
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created category
 * Error: status 400 - Bad Request and error message
 */
app.post('/categories', (req, res) => {
    const { description } = req.body;
    if (description) {
        const category = {
            id: database.categories.length + 1,
            description,
        };
        database.categories.push(category);
        res.status(201).json({
            id: category.id,
        });
    } else {
        res.status(400).json({
            error: 'Description is missing',
        });
    }
});

/**
 * Delete category
 * DELETE - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // Check if category exists
    const category = findCategoryById(id);
    if (category) {
        // Find category index
        const index = database.categories.findIndex((element) => element.id === id);
        // Remove category from 'database'
        database.categories.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(400).json({
            error: `No category found with id: ${id}`,
        });
    }
});

/**
 * Update category
 * PATCH - /categories/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
        const category = findCategoryById(id);
        if (category) {
            const index = database.categories.findIndex((element) => element.id === id);
            database.categories[index].description = description;
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(400).json({
                error: `No category found with id: ${id}`,
            });
        }
    } else {
        res.status(400).json({
            error: 'No description provided',
        });
    }
});

/**
 * Excuses
 */

/**
 * Get all excuses
 * GET - /excuses
 * Required values: none
 * Optional values: parameter categoryId=:id - returns excuses with category specified by categoryId
 * Success: status 200 - OK and list of excuses
 */
app.get('/excuses', (req, res) => {
    const categoryId = parseInt(req.query.categoryId, 10);
    if (categoryId) {
        const category = findCategoryById(categoryId);
        if (category) {
            const excusesInCategory = database.excuses.filter(
                (element) => element.categoryId === categoryId,
            );
            if (excusesInCategory) {
                const excusesInCategoryWithCreator = getExcusesWithCreator(excusesInCategory);
                const excusesWithComments = getExcusesWithComments(excusesInCategoryWithCreator);
                const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
                res.status(200).json({
                    excuses: excusesWithCategory,
                });
            } else {
                res.status(400).json({
                    error: `No excuse found with categoryId: ${categoryId}`,
                });
            }
        } else {
            res.status(400).json({
                error: `No excuse found with categoryId: ${categoryId}`,
            });
        }
    }
    const excusesWithCreator = getExcusesWithCreator(database.excuses);
    const excusesWithComments = getExcusesWithComments(excusesWithCreator);
    const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
    res.status(200).json({
        excuses: excusesWithCategory,
    });
});

/**
 * Get ecxuse by specified id
 * GET - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and excuse with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/excuses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const excuse = findExcuseById(id);
    if (excuse) {
        res.status(200).json({
            excuse,
        });
    } else {
        res.status(400).json({
            error: 'No excuse found',
        });
    }
});

/**
 * Create new excuse
 * POST - /excuses
 * Required values: description, categoryId
 * Optional values: none
 * Success: status 201 - Created and id of created excuse
 * Error: status 400 - Bad Request and error message
 */
app.post('/excuses', (req, res) => {
    const { description, categoryId } = req.body;
    if (description && categoryId) {
        const excuse = {
            id: database.excuses.length + 1,
            description,
            categoryId,
        };
        database.excuses.push(excuse);
        res.status(201).json({
            id: excuse.id,
        });
    } else if (!description) {
        res.status(400).json({
            error: 'Description is missing',
        });
    } else if (!categoryId) {
        res.status(400).json({
            error: 'Category id is missing',
        });
    }
});

/**
 * Delete excuse
 * DELETE - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/excuses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // Check if index exists
    const index = database.excuses.findIndex((element) => element.id === id);
    if (index !== -1) {
        database.excuses.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(400).json({
            error: `No excuse found with id: ${id}`,
        });
    }
});

/**
 * Update excuse
 * PATCH - /excuses/:id
 * Required values: id, description OR categoryId
 * Optional values: description OR categoryId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/excuses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description, categoryId } = req.body.description;
    // Check if excuse exists
    const index = database.excuses.findIndex((element) => element.id === id);
    if (index !== -1 && (description || categoryId)) {
        if (description) {
            database.excuses[index].description = description;
        }
        if (categoryId) {
            database.excuses[index].categoryId = categoryId;
        }
        res.status(200).json({
            success: true,
        });
    } else if (index === -1) {
        res.status(400).json({
            error: `No excuse found with id: ${id}`,
        });
    } else {
        res.status(400).json({
            error: 'No required data provided',
        });
    }
});

// Start listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

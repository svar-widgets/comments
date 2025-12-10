context("Resolve and fetch with mock backend", () => {
	it("should load comments from mock backend", () => {
		cy.visit(`/index.html#/mock-backend/willow`);

		cy.get(".wx-messages .wx-flow", { timeout: 10000 }).should(
			"have.length",
			3
		);

		cy.shot(`backend-resolve-willow`, { area: ".content" });
	});

	it("should add comment via mock backend", () => {
		cy.visit(`/index.html#/mock-backend/willow`);

		cy.get(".wx-messages .wx-flow", { timeout: 10000 }).should(
			"have.length",
			3
		);

		const newComment = "Backend test comment";
		cy.addComment(newComment);

		cy.wait(500);

		cy.get(".wx-messages .wx-flow").should("have.length", 4);

		cy.get(".wx-messages .wx-flow")
			.last()
			.should("contain.text", newComment);

		//hide current date, which is always changing
		cy.get(".wx-comment-date").last().invoke("css", "visibility", "hidden");
		cy.shot(`backend-add-comment-willow`, { area: ".content" });
		cy.get(".wx-comment-date").last().invoke("css", "visibility", "");
	});

	it("should switch between pages", () => {
		cy.visit(`/index.html#/mock-backend/willow`);

		cy.get(".wx-messages .wx-flow", { timeout: 10000 }).should(
			"have.length",
			3
		);

		cy.get(".toolbar button").contains("Page 2").click();

		cy.wait(500);

		cy.get(".wx-messages .wx-flow", { timeout: 10000 }).should(
			"have.length",
			2
		);

		cy.shot(`backend-page2-willow`, { area: ".content" });
	});
});

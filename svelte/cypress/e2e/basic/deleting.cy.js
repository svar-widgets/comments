context("Deleting comments", () => {
	it("should show menu icon only for current user", () => {
		cy.visit(`/index.html#/base/willow`);

		cy.get(".wx-messages .wx-flow").should("have.length", 3);

		cy.get(".wx-messages .wx-flow")
			.first()
			.trigger("mouseenter")
			.find(".wx-menu-icon")
			.should("exist");

		cy.get(".wx-messages .wx-flow")
			.last()
			.trigger("mouseenter")
			.find(".wx-menu-icon")
			.should("not.exist");
	});

	it("should delete a comment", () => {
		cy.visit(`/index.html#/base/willow`);

		cy.get(".wx-messages .wx-flow").should("have.length", 3);

		cy.get(".wx-messages .wx-flow").first().find(".wx-menu-icon").click();
		cy.get('[data-id="delete-comment"]').click();

		cy.get(".wx-messages .wx-flow").should("have.length", 2);

		cy.shot(`delete-comment-willow`, { area: ".content" });
	});
});

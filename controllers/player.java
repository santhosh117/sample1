public static Result getProfile()
    {
        response().setContentType("Application/json");

        try
        {
            DynamicForm dynamicForm = Form.form().bindFromRequest();
            DocumentReader.readSettings();

            if(!CocCommon.isNullOrEmpty(dynamicForm.get("email"))
                    && !CocCommon.isNullOrEmpty(dynamicForm.get("userphoto"))
                    && !CocCommon.isNullOrEmpty(dynamicForm.get("name")))
            {
                implPlayer obj = new implPlayer();
                return ok(obj.getProfile(dynamicForm.get("email"),
                        dynamicForm.get("userphoto"),
                        dynamicForm.get("name")));
            }
            else
            {
                return ok("{\"Error\":\"Unknown error\"}");
            }

        }
        catch (Exception e)
        {
            return ok("{\"Error\":\"Unknown error\"}");
        }

    }

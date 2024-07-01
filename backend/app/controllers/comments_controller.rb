class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: [:show, :destroy]

    # POST /groups/:group_id/posts/:post_id/comments
    def create
      @comment = @post.comments.new(comment_params)
      @comment.user_id = @current_user.id
      if @comment.save
        render json: @comment, status: :created
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # GET /groups/:group_id/posts/:post_id/comments/:id
    def show
      render json: @comment
    end

    def destroy
      if @comment.user_id == @current_user.id
        if  @comment.destroy
          render json: { message: "Comment Deleted" }, status: :ok
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      else
        render json: { errors: "Not Authorized" }, status: :unauthorized
      end
    end

    private

    def set_post
      puts 'post_id', params[:post_id]
      @post = Post.find(params[:post_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Post not found" }, status: :not_found
    end

    def set_comment
      @comment = @post.comments.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Comment not found" }, status: :not_found
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
  end